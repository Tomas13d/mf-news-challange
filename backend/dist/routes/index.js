"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_1 = __importDefault(require("./news"));
const auth_1 = __importDefault(require("./auth"));
const openAI_1 = __importDefault(require("./openAI"));
const router = (0, express_1.Router)();
router.use("/news", news_1.default);
router.use("/auth", auth_1.default);
router.use("/openai", openAI_1.default);
exports.default = router;
