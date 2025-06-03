import { Router } from "express";
import * as NewsController from "../../controllers/news";

const router = Router();

router.get("/", NewsController.getAll);
router.get("/search", NewsController.search);
router.get("/:id", NewsController.getById);
router.post("/", NewsController.create);
router.put("/:id", NewsController.update);
router.delete("/:id", NewsController.remove);

export default router;
