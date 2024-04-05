import axios from "axios";
import * as cheerio from "cheerio";
import { getRandomBetween, roundTo99 } from "../utils/helpers.js";
import { OpenaiService } from "./openai.js";

const openAiService = new OpenaiService();

export class ScrapflyService {
  #apiKey = process.env.SCRAPFLY_KEY;
  concurrencyAllowed = Number(process.env.SCRAPFLY_CONCURRENCY_ALLOWED);

  async requestScrapfly(url, { tryCount, parser, currency = "USD", session }) {
    const defaultOptions = new URLSearchParams({
      url,
      key: this.#apiKey,
      lang: "en",
      asp: true,
      country: "gb",
      session: session.shop.split(".")[0],
      ["headers[cookie]"]: `aep_usuc_f=site=glo&c_tp=${currency}&region=UK&b_locale=en_US`,
    });

    const fullURL = `https://api.scrapfly.io/scrape?${defaultOptions}`;

    while (tryCount > 0) {
      try {
        const response = await axios.get(fullURL);
        console.log("response: ", response);
        const result = parser?.(response.data.result.content);

        if (result) {
          return result;
        } else {
          tryCount--;
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.log(error.message);
        if (error.response?.status === 429) {
          return;
        }

        tryCount--;
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return null;
  }

  aliexpressListParser(htmlRow) {
    const $ = cheerio.load(htmlRow);
    const scriptWithData = $('script:contains("window._dida_config_")')
      .first()
      .html();
    const regex = /_init_data_\s*=\s*{\s*data:\s*({.+}) }/;
    const match = scriptWithData.match(regex);
    if (match) {
      const jsonData = JSON.parse(match[1]);
      const rawData = jsonData.data.root.fields;
      if (rawData.pageInfo.success) {
        const products =
          rawData.mods.itemList?.content.map((item) => ({
            title: item.title?.displayTitle,
            price: item.prices?.salePrice?.formattedPrice,
            rating: item?.evaluation?.starRating,
            productId: item.productId,
            image: "https:" + item.image.imgUrl,
            detailsUrl:
              "https://www.aliexpress.com" +
              (item.productDetailUrl ?? `/item/${item.productId}.html`),
          })) ?? [];
        return {
          products: products,
          page: rawData.pageInfo.page,
          pageLimit: 60,
        };
      } else {
        return false;
      }
    } else {
      throw new Error("Data not found in script tag.");
    }
  }

  aliexpressItemParser(htmlRow) {
    const $ = cheerio.load(htmlRow);
    const scriptWithData = $('script:contains("window.runParams")')
      .first()
      .html();
    const match = scriptWithData.match(/data: ({.+?})\n/);
    if (match) {
      return JSON.parse(match[1]);
    } else {
      throw new Error("Data not found in script tag.");
    }
  }

  async formatAliexpressProduct(jsonData, settings) {
    const {
      skuComponent,
      priceComponent,
      webGeneralFreightCalculateComponent,
    } = jsonData;

    const standardShippingMethod =
      webGeneralFreightCalculateComponent.originalLayoutResultList?.find(
        ({ bizData }) => bizData.deliveryOptionCode === "CAINIAO_STANDARD"
      );

    const standardShippingPrice = !standardShippingMethod
      ? 5
      : standardShippingMethod.bizData?.displayAmount
      ? standardShippingMethod.bizData.displayAmount
      : 0;

    function generateCombinations(
      properties,
      priceList,
      currentIndex,
      currentCombination
    ) {
      if (currentIndex === properties.length) {
        const { propertyValueId, ...combination } = currentCombination;
        const mergedId = propertyValueId.join(",");

        const priceItemIndex = priceList.findIndex((item) =>
          item.skuPropIds.includes(mergedId)
        );
        const priceItem = priceList.splice(priceItemIndex, 1).at();

        const price =
          settings.priceMultiplier *
          (standardShippingPrice + (priceItem?.skuVal?.skuAmount?.value ?? 0));
        const preparedPrice = roundTo99(
          settings.minPrice
            ? price < settings.minPrice
              ? settings.minPrice
              : price
            : price
        );

        const compareAtPrice =
          settings.compareAtPriceMultiplier > 1
            ? roundTo99(preparedPrice * settings.compareAtPriceMultiplier)
            : preparedPrice;

        const modifiedCombination = {
          ...combination,
          inventoryItem: {
            tracked: true,
          },
          inventoryQuantities: {
            availableQuantity: getRandomBetween(15, 50),
            locationId: settings.locationId,
          },
          price: preparedPrice,
          ...(preparedPrice !== compareAtPrice ? { compareAtPrice } : {}),
        };

        return [modifiedCombination];
      }

      const currentProperty = properties[currentIndex];
      const propertyValues = currentProperty.skuPropertyValues;

      let variants = [];

      for (const value of propertyValues) {
        const variantImage =
          value?.skuPropertyImagePath || currentCombination?.imageSrc;
        const updatedCombination = {
          options: [
            ...currentCombination.options,
            value.propertyValueDisplayName,
          ],
          propertyValueId: [
            ...currentCombination.propertyValueId,
            value.propertyValueIdLong,
          ],
          ...(variantImage ? { imageSrc: variantImage } : {}),
        };

        variants = [
          ...variants,
          ...generateCombinations(
            properties,
            priceList,
            currentIndex + 1,
            updatedCombination
          ),
        ];
      }

      return variants.slice(0, 99);
    }

    const formattedText = await openAiService.getNewJSON(
      {
        title: jsonData.metaDataComponent.title,
        description: jsonData.metaDataComponent.description,
      },
      settings.language,
      settings.maxTitleLength
    );

    const filteredSKUPropertyList =
      skuComponent?.productSKUPropertyList
        ?.filter((item) => item.skuPropertyName !== "Ships From")
        .slice(0, 3) ?? [];

    const rawVariants = generateCombinations(
      filteredSKUPropertyList,
      priceComponent.skuPriceList,
      0,
      {
        options: [],
        propertyValueId: [],
      }
    );

    const optionsArray = rawVariants.map((item) => item.options);

    const translatedOptionsArray = await openAiService.translateOptions(
      optionsArray,
      settings.language
    );

    const variants = rawVariants.map((item, i) => ({
      ...item,
      options: translatedOptionsArray[i],
    }));

    const rawOptions = filteredSKUPropertyList.map(
      (item) => item.skuPropertyName
    );
    const options = await openAiService.translateOptions(
      rawOptions,
      settings.language
    );

    const images = [];

    variants.forEach((variant) => {
      if (variant.imageSrc) {
        images.push({
          altText: formattedText.title,
          src: variant.imageSrc,
        });
      }
    });

    jsonData.imageComponent?.imagePathList?.forEach((img) => {
      images.push({
        altText: formattedText.title,
        src: img,
      });
    });
    return {
      input: {
        title: formattedText.title,
        descriptionHtml: `<p>${formattedText.description}</p>`,
        tags: settings.tag,
        aliexpressId: jsonData.productInfoComponent.idStr,
        published: true,
        status: settings.status,
        options,
        images,
        variants,
        ...(!!settings.type ? { productType: settings.type } : {}),
      },
    };
  }
}
