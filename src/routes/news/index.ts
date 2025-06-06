import { Router } from "express";
import * as NewsController from "../../controllers/news";

const router = Router();
router.get("/search", NewsController.search);
router.get("/category/:category", NewsController.getByCategory);

// CRUD news
router.get("/", NewsController.getAll);
router.get("/:id", NewsController.getById);
router.post("/", NewsController.create);
router.patch("/:id", NewsController.update);
router.delete("/:id", NewsController.remove);

export default router;
