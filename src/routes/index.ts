import { Router } from "express";
import newsRouter from "./news";

const router = Router();

router.use("/news", newsRouter);
// More routes ...

export default router;
