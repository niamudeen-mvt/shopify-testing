import ProductImport, { importStatus } from "../models/ProductImport.js";
import importRequestQueue, {
  jobStatusMap,
} from "../bull/queues/import-request-queue.js";

class ImportHistoryController {
  static async requestImports(_req, res) {
    // let { id } = res.locals.shopify.session;

    const { id } = _req.params;
    console.log("_req.params: ", _req.params);

    try {
      let imports = await ProductImport.find({ storeId: id });
      return res.status(200).json({ status: "success", data: imports });
    } catch (error) {
      return res.status(500).json({ status: "failed", data: error.message });
    }
  }

  static async retryImport(_req, res) {
    const { taskId } = _req.body;
    console.log("taskId: ", taskId);
    try {
      // const job = await importRequestQueue.getJob(taskId);
      // const importItem = await ProductImport.findById(job.data.importId);

      const importItem = await ProductImport.findById({ _id: taskId });
      console.log("importItem: ", importItem);

      if (!importItem) {
        throw new Error("Import does not exist");
      }

      // await job.retry();
      importItem.status = importStatus.QUEUE;
      await importItem.save();

      return res.status(200).json({ status: "success", data: importItem });
    } catch (error) {
      return res.status(500).json({ status: "failed", data: error.message });
    }
  }

  static async stopImport(_req, res) {
    const { taskId } = _req.body;
    try {
      // const job = await importRequestQueue.getJob(taskId);
      // const importItem = await ProductImport.findById(job.data.importId);

      const importItem = await ProductImport.findById({ _id: taskId });
      console.log("importItem: ", importItem);

      if (!importItem) {
        return res
          .status(400)
          .json({ status: "failed", data: "Import does not exist" });
      }

      if (
        [importStatus.SUCCESS, importStatus.FAILED].includes(importItem.status)
      ) {
        return res
          .status(400)
          .json({ status: "failed", data: "Import already finished" });
      }

      // await job.discard();
      // await job.moveToFailed({ message: "Forcibly stopped" }, true);
      // jobStatusMap.set(taskId, true);

      importItem.status = importStatus.FAILED;
      await importItem.save();

      return res.status(200).json({ status: "success", data: importItem });
    } catch (error) {
      console.log("error: ", error?.message);
      return res.status(500).json({ status: "failed", data: error.message });
    }
  }
}

export default ImportHistoryController;
