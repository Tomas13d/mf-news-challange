import { Router } from "express";
import newsRouter from "./news";
import authRouters from "./auth";
import openAiRoutes from "./openAI";

const router = Router();

router.use("/news", newsRouter);
router.use("/auth", authRouters);
router.use("/open-ai", openAiRoutes);

export default router;
