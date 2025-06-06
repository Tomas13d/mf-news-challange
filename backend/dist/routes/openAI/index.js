"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openAI_1 = require("../../controllers/openAI");
const router = (0, express_1.Router)();
router.post("/improve-text", openAI_1.improveTextController);
router.get("/generate-news", openAI_1.generateNewsController);
exports.default = router;
