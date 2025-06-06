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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// __tests__/news.test.ts
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const NewsController = __importStar(require("../controllers/news"));
const NewsService = __importStar(require("../services/news"));
jest.mock("../services/news");
const mockedNewsService = NewsService;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/news", NewsController.getAll);
app.get("/news/:id", NewsController.getById);
app.get("/news/category/:category", NewsController.getByCategory);
app.post("/news", NewsController.create);
app.patch("/news/:id", NewsController.update);
app.delete("/news/:id", NewsController.remove);
app.get("/news/search", NewsController.search);
describe("News API", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("GET /news", () => {
        it("debería devolver todas las noticias", () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeNews = [
                { id: 1, title: "Noticia 1" },
                { id: 2, title: "Noticia 2" },
            ];
            mockedNewsService.getAllNews.mockResolvedValueOnce(fakeNews);
            const res = yield (0, supertest_1.default)(app).get("/news");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(fakeNews);
            expect(mockedNewsService.getAllNews).toHaveBeenCalled();
        }));
    });
    describe("GET /news/:id", () => {
        it("debería devolver noticia por id si existe", () => __awaiter(void 0, void 0, void 0, function* () {
            const newsItem = { id: 1, title: "Noticia 1" };
            mockedNewsService.getNewsById.mockResolvedValueOnce(newsItem);
            const res = yield (0, supertest_1.default)(app).get("/news/1");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(newsItem);
            expect(mockedNewsService.getNewsById).toHaveBeenCalledWith(1);
        }));
        it("debería devolver 404 si no existe la noticia", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNewsService.getNewsById.mockResolvedValueOnce(null);
            const res = yield (0, supertest_1.default)(app).get("/news/999");
            expect(res.status).toBe(404);
            expect(res.body).toEqual({ error: "Not found" });
        }));
    });
    describe("GET /news/category/:category", () => {
        it("debería devolver noticias por categoría", () => __awaiter(void 0, void 0, void 0, function* () {
            const newsByCategory = [{ id: 2, category: "tech" }];
            mockedNewsService.getNewsByCategory.mockResolvedValueOnce(newsByCategory);
            const res = yield (0, supertest_1.default)(app).get("/news/category/tech");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(newsByCategory);
            expect(mockedNewsService.getNewsByCategory).toHaveBeenCalledWith("tech");
        }));
        it("debería devolver 400 si falta categoría", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app).get("/news/category/");
            expect(res.status).toBe(404);
        }));
        it("debería devolver 404 si no hay noticias para categoría", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNewsService.getNewsByCategory.mockResolvedValueOnce([]);
            const res = yield (0, supertest_1.default)(app).get("/news/category/nada");
            expect(res.status).toBe(404);
            expect(res.body).toEqual({ error: "No news found for this category" });
        }));
    });
    describe("POST /news", () => {
        it("debería crear noticia y devolverla", () => __awaiter(void 0, void 0, void 0, function* () {
            const newNews = {
                title: "Nueva Noticia",
                content: "Contenido",
                category: "general",
                author: "autor",
                date: "2025-06-06T00:00:00.000Z",
                summary: "Resumen",
                imageUrl: "http://image.url",
            };
            const createdNews = Object.assign({ id: 1 }, newNews);
            mockedNewsService.createNews.mockResolvedValueOnce(createdNews);
            const res = yield (0, supertest_1.default)(app).post("/news").send(newNews);
            expect(res.status).toBe(201);
            expect(res.body).toEqual(createdNews);
            expect(mockedNewsService.createNews).toHaveBeenCalledWith(newNews);
        }));
    });
    describe("PATCH /news/:id", () => {
        it("debería actualizar noticia y devolverla", () => __awaiter(void 0, void 0, void 0, function* () {
            const updates = { title: "Título actualizado" };
            const updatedNews = { id: 1, title: "Título actualizado" };
            mockedNewsService.updateNews.mockResolvedValueOnce(updatedNews);
            const res = yield (0, supertest_1.default)(app).patch("/news/1").send(updates);
            expect(res.status).toBe(200);
            expect(res.body).toEqual(updatedNews);
            expect(mockedNewsService.updateNews).toHaveBeenCalledWith(1, updates);
        }));
    });
    describe("DELETE /news/:id", () => {
        it("debería eliminar noticia y devolver 204", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNewsService.deleteNews.mockResolvedValueOnce(undefined);
            const res = yield (0, supertest_1.default)(app).delete("/news/1");
            expect(res.status).toBe(204);
            expect(mockedNewsService.deleteNews).toHaveBeenCalledWith(1);
        }));
    });
});
