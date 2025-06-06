import { Router } from "express";
import * as openAIControllers from "../../controllers/openAI";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();

router.post(
  "/improve-text",
  authenticate,
  openAIControllers.improveTextController
);

router.get(
  "/generate-news",
  authenticate,
  openAIControllers.generateNewsController
);

export default router;
