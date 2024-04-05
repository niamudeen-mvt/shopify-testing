import { Router } from "express";
import ScrapflyController from "../controllers/scrapfly.js";

const scrapflyRouter = Router();
scrapflyRouter.get("/request-products", ScrapflyController.requestProducts);
scrapflyRouter.post("/import-products", ScrapflyController.importProducts);

export default scrapflyRouter;
