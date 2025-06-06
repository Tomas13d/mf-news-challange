"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.remove = exports.update = exports.create = exports.getByCategory = exports.getById = exports.getAll = void 0;
const NewsService = __importStar(require("../../services/news"));
const getAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield NewsService.getAllNews();
    res.json(news);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield NewsService.getNewsById(Number(req.params.id));
    if (!news) {
        res.status(404).json({ error: "Not found" });
        return;
    }
    res.json(news);
    return;
});
exports.getById = getById;
const getByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    if (!category || typeof category !== "string") {
        res.status(400).json({ error: "Missing or invalid 'category' parameter" });
        return;
    }
    const news = yield NewsService.getNewsByCategory(category);
    if (!news || news.length === 0) {
        res.status(404).json({ error: "No news found for this category" });
        return;
    }
    res.json(news);
    return;
});
exports.getByCategory = getByCategory;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const created = yield NewsService.createNews(req.body);
    res.status(201).json(created);
    return;
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield NewsService.updateNews(Number(req.params.id), req.body);
    res.json(updated);
    return;
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield NewsService.deleteNews(Number(req.params.id));
    res.status(204).send();
    return;
});
exports.remove = remove;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield NewsService.searchNews(req.query.q);
    res.json(results);
    return;
});
exports.search = search;
