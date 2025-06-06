import { Router } from "express";
import {
  improveTextController,
  generateNewsController,
} from "../../controllers/openAI";

const router = Router();

router.post("/improve-text", improveTextController);
router.get("/generate-news", generateNewsController);

export default router;
