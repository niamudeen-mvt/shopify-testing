import { Router } from "express";
import authRouter from "./auth.routes.js";
import scrapflyRouter from "./scrapfly.routes.js";
import importHistoryRouter from "./importHistory.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/scrapfly", scrapflyRouter);
router.use("/import-history", importHistoryRouter);

export default router;
