import { Router } from "express";
import newsRouter from "./news";
import authRouters from "./auth"

const router = Router();

router.use("/news", newsRouter);
router.use("/auth", authRouters);

export default router;
