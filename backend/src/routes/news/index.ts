import { Router } from "express";
import * as NewsController from "../../controllers/news";
import { authenticate } from "../../middleware/authMiddleware";

const router = Router();
router.get("/search", NewsController.search);
router.get("/category/:category", NewsController.getByCategory);

router.get("/", NewsController.getAll);
router.get("/:id", NewsController.getById);

// 🔒 Rutas protegidas
router.post("/", authenticate, NewsController.create);
router.patch("/:id", authenticate, NewsController.update);
router.delete("/:id", authenticate, NewsController.remove);

export default router;
