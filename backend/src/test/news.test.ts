// __tests__/news.test.ts
import request from "supertest";
import express from "express";
import * as NewsController from "../controllers/news";
import * as NewsService from "../services/news";

jest.mock("../services/news");
const mockedNewsService = NewsService as jest.Mocked<typeof NewsService>;

const app = express();
app.use(express.json());

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
    it("debería devolver todas las noticias", async () => {
      const fakeNews = [
        { id: 1, title: "Noticia 1" },
        { id: 2, title: "Noticia 2" },
      ];
      mockedNewsService.getAllNews.mockResolvedValueOnce(fakeNews as any);

      const res = await request(app).get("/news");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fakeNews);
      expect(mockedNewsService.getAllNews).toHaveBeenCalled();
    });
  });

  describe("GET /news/:id", () => {
    it("debería devolver noticia por id si existe", async () => {
      const newsItem = { id: 1, title: "Noticia 1" };
      mockedNewsService.getNewsById.mockResolvedValueOnce(newsItem as any);

      const res = await request(app).get("/news/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(newsItem);
      expect(mockedNewsService.getNewsById).toHaveBeenCalledWith(1);
    });

    it("debería devolver 404 si no existe la noticia", async () => {
      mockedNewsService.getNewsById.mockResolvedValueOnce(null);

      const res = await request(app).get("/news/999");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Not found" });
    });
  });

  describe("GET /news/category/:category", () => {
    it("debería devolver noticias por categoría", async () => {
      const newsByCategory = [{ id: 2, category: "tech" }];
      mockedNewsService.getNewsByCategory.mockResolvedValueOnce(
        newsByCategory as any
      );

      const res = await request(app).get("/news/category/tech");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(newsByCategory);
      expect(mockedNewsService.getNewsByCategory).toHaveBeenCalledWith("tech");
    });

    it("debería devolver 400 si falta categoría", async () => {
      const res = await request(app).get("/news/category/");

      expect(res.status).toBe(404);
    });

    it("debería devolver 404 si no hay noticias para categoría", async () => {
      mockedNewsService.getNewsByCategory.mockResolvedValueOnce([]);

      const res = await request(app).get("/news/category/nada");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "No news found for this category" });
    });
  });

  describe("POST /news", () => {
    it("debería crear noticia y devolverla", async () => {
      const newNews = {
        title: "Nueva Noticia",
        content: "Contenido",
        category: "general",
        author: "autor",
        date: "2025-06-06T00:00:00.000Z",
        summary: "Resumen",
        imageUrl: "http://image.url",
      };
      const createdNews = { id: 1, ...newNews };
      mockedNewsService.createNews.mockResolvedValueOnce(createdNews as any);

      const res = await request(app).post("/news").send(newNews);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(createdNews);
      expect(mockedNewsService.createNews).toHaveBeenCalledWith(newNews);
    });
  });

  describe("PATCH /news/:id", () => {
    it("debería actualizar noticia y devolverla", async () => {
      const updates = { title: "Título actualizado" };
      const updatedNews = { id: 1, title: "Título actualizado" };
      mockedNewsService.updateNews.mockResolvedValueOnce(updatedNews as any);

      const res = await request(app).patch("/news/1").send(updates);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedNews);
      expect(mockedNewsService.updateNews).toHaveBeenCalledWith(1, updates);
    });
  });

  describe("DELETE /news/:id", () => {
    it("debería eliminar noticia y devolver 204", async () => {
      mockedNewsService.deleteNews.mockResolvedValueOnce(undefined as any);

      const res = await request(app).delete("/news/1");

      expect(res.status).toBe(204);
      expect(mockedNewsService.deleteNews).toHaveBeenCalledWith(1);
    });
  });
});
