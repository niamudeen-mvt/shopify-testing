import ProductImport, {
  importStatus,
  productStatus,
} from "../models/ProductImport.js";
import { replaceSpaces } from "../utils/helpers.js";
import { ScrapflyService } from "../services/scrapfly.js";
import importRequestQueue from "../bull/queues/import-request-queue.js";

const scrapflyService = new ScrapflyService();

class ScrapflyController {
  static async requestProducts(_req, res) {
    const { keyword, rating, currency = "AUD", page = 1, shop } = _req.query;
    const session = { shop: `${shop}.myshopify.com` };
    if (!keyword) {
      return res
        .status(400)
        .json({ status: "failed", data: "keyword is required parameter" });
    }

    const searchUrl = encodeURIComponent(
      `https://www.aliexpress.com/w/wholesale-${replaceSpaces(
        keyword,
        "-"
      )}.html?catId=0&SearchText=${replaceSpaces(keyword, "+")}&page=${page}${
        rating === "true" ? "&isFavorite=y" : ""
      }`
    );

    try {
      const result = await scrapflyService.requestScrapfly(searchUrl, {
        tryCount: 6,
        parser: scrapflyService.aliexpressListParser,
        session,
        currency,
      });
      return result
        ? res.status(200).json({ status: "success", data: result })
        : res.status(500).json({
            status: "failed",
            data: "Not found",
          });
    } catch (error) {
      return res.status(500).json({ status: "failed", data: error.message });
    }
  }

  static importProducts = async (_req, res) => {
    const {
      products: productIds,
      priceMultiplier = 1,
      compareAtPriceMultiplier = 1,
      minPrice,
      currency,
      language = "English",
      status = "ACTIVE",
      type,
      maxTitleLength = 15,
      tag,
      shopify_session,
    } = _req.body;

    const session = {
      ...shopify_session,
      accessToken: shopify_session?.access_token,
    };
    delete session["access_token"];

    if (!productIds || productIds.length === 0) {
      return res
        .status(401)
        .json({ status: "failed", data: "No data provided" });
    }

    try {
      const uniqueProductIds = await this.#excludeProductDuplicates(
        session.id,
        productIds
      );

      if (uniqueProductIds?.length === 0) {
        return res.status(400).json({
          status: "warning",
          data: "The selected products have already been imported",
        });
      }

      const productImport = await new ProductImport({
        storeId: session.id,
        products: uniqueProductIds.map((productId) => ({
          productId,
          status: productStatus.NEW,
        })),
        status: importStatus.QUEUE,
      });

      await productImport.save();

      importRequestQueue.add({
        importId: productImport._id,
        session,
        settings: {
          priceMultiplier,
          compareAtPriceMultiplier,
          minPrice,
          language,
          currency,
          status,
          type,
          maxTitleLength,
          tag,
        },
      });
      return res
        .status(200)
        .json({ status: "success", data: "Import started" });
    } catch (error) {
      res.status(500).json({ status: "failed", data: error.message });
    }
  };

  static #excludeProductDuplicates = async (sessionId, productIds) => {
    const existingProducts = new Set(
      await ProductImport.distinct("products.productId", {
        storeId: sessionId,
      })
    );

    return productIds.filter((id) => !existingProducts.has(id));
  };
}

export default ScrapflyController;
