import Queue from "bull";
import { batchRequests, wait } from "../../utils/helpers.js";
import ProductImport, {
  importStatus,
  productStatus,
} from "../../models/ProductImport.js";
import shopify from "../../shopify.js";
import { createProduct, getStoreLocation } from "../../queries.js";
import { ScrapflyService } from "../../services/scrapfly.js";
import { OpenaiService } from "../../services/openai.js";

const { REDIS_URL } = process.env;
const redisConfig = new URL(REDIS_URL);

const scrapflyService = new ScrapflyService();
const openAiService = new OpenaiService();

const importRequestQueue = new Queue("my-task-queue", {
  redis: {
    host: redisConfig.hostname,
    port: redisConfig.port,
    password: redisConfig?.password,
    username: redisConfig?.username,
  },
  settings: {
    removeOnComplete: true,
    stalledInterval: 60 * 1000,
  },
});
console.log("importRequestQueue: ", importRequestQueue);

export const jobStatusMap = new Map();

importRequestQueue.on("failed", async function ({ data, id }) {
  console.log("import failed");
  jobStatusMap.set(id, true);

  try {
    const productImportHistory = await ProductImport.findById(data.importId);
    if (!productImportHistory) {
      throw new Error("Import does not exist");
    }

    productImportHistory.status = importStatus.FAILED;
    await productImportHistory.save();
  } catch (error) {
    console.log("queue error: ", error.message);
  }
});

importRequestQueue.process(async ({ data, moveToFailed, id }) => {
  console.log("import progress");

  jobStatusMap.set(id, false);

  const { importId, session, settings } = data;
  console.log("data: ", data);
  let productImportHistory;

  const concurrency = Math.min(
    openAiService.concurrencyAllowed,
    scrapflyService.concurrencyAllowed
  );
  console.log("concurrency: ", concurrency);

  try {
    console.log(`Import: ${importId} in progress`);

    productImportHistory = await ProductImport.findById(importId);
    const client = new shopify.api.clients.Graphql({ session });
    const concurrentDelay = 60000;
    console.log("productImportHistory: ", productImportHistory);

    if (!productImportHistory) {
      throw new Error("Import does not exist");
    }

    const changeCurrentProductStatus = (productId, status) => {
      const productIndex = productImportHistory.products.findIndex(
        (p) => p.productId === productId
      );
      if (productIndex !== -1) {
        productImportHistory.products[productIndex].status = status;
      }
    };

    const location = await getStoreLocation(client);
    const locationId = location.body.data.locations.edges[0].node.id;

    if (!locationId) {
      throw new Error("Set up a location in your store: locationId missing");
    }

    productImportHistory.taskId = id;
    productImportHistory.status = importStatus.IN_PROCESS;
    console.log("productImportHistory: ", productImportHistory);
    await productImportHistory.save();

    const notFinishedProducts = productImportHistory?.products.filter(
      (product) => product.status !== productStatus.SUCCESS
    );

    console.log("notFinishedProducts: ", notFinishedProducts);
    const promises = notFinishedProducts.map(({ productId }) => async () => {
      if (jobStatusMap.get(id)) {
        throw new Error("Job has been stopped.");
      }

      const searchUrl = encodeURIComponent(
        `https://www.aliexpress.com/item/${productId}.html`
      );
      try {
        const result = await scrapflyService.requestScrapfly(searchUrl, {
          tryCount: 1,
          currency: settings.currency,
          parser: scrapflyService.aliexpressItemParser,
          session,
        });

        console.log("result: ", result);
        if (jobStatusMap.get(id)) {
          throw new Error("Job has been stopped.");
        }

        const { input } = await scrapflyService.formatAliexpressProduct(
          result,
          {
            ...settings,
            locationId,
          }
        );

        if (jobStatusMap.get(id)) {
          throw new Error("Job has been stopped.");
        }
        console.log("input: ", input);

        await createProduct(client, input);

        if (jobStatusMap.get(id)) {
          throw new Error("Job has been stopped.");
        }

        changeCurrentProductStatus(productId, productStatus.SUCCESS);

        console.log(`Product: "${productId}" created successful`);

        if (jobStatusMap.get(id)) {
          throw new Error("Job has been stopped.");
        }
      } catch (error) {
        changeCurrentProductStatus(productId, productStatus.FAILED);

        console.error(`Product: "${productId}" not imported: `, error.message);
      } finally {
        await productImportHistory.save();

        if (jobStatusMap.get(id)) {
          throw new Error("Job has been stopped.");
        }
      }
    });
    await wait(concurrentDelay);
    await batchRequests(promises, concurrency, concurrentDelay);

    const isFailedImport = productImportHistory?.products.every(
      (product) => product.status === productStatus.FAILED
    );

    if (isFailedImport) {
      productImportHistory.status = importStatus.FAILED;
      await moveToFailed({ message: "No products could be imported" }, true);
    } else {
      productImportHistory.status = importStatus.SUCCESS;
    }
    console.log(`Import: ${importId} completed`);
  } catch (error) {
    console.log("queue error: ", error.message);

    if (productImportHistory) {
      productImportHistory.status = importStatus.FAILED;
      await moveToFailed({ message: error }, true);
    }
  } finally {
    if (productImportHistory) {
      await wait(1000);
      await productImportHistory.save();
    }
  }
});

export default importRequestQueue;
