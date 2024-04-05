import { Router } from "express";
import ImportHistoryController from "../controllers/importHistory.js";

const importHistoryRouter = Router();

importHistoryRouter.get(
  "/request-imports/:id",
  ImportHistoryController.requestImports
);
importHistoryRouter.post("/retry-import", ImportHistoryController.retryImport);
importHistoryRouter.post("/decline", ImportHistoryController.stopImport);

export default importHistoryRouter;
