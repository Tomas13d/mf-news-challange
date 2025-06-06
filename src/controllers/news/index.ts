import { Request, Response } from "express";
import * as NewsService from "../../services/news";

export const getAll = async (_req: Request, res: Response) => {
  const news = await NewsService.getAllNews();
  res.json(news);
};

export const getById = async (req: Request, res: Response) => {
  const news = await NewsService.getNewsById(Number(req.params.id));
  if (!news) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(news);
  return;
};

export const getByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;

  if (!category || typeof category !== "string") {
    res.status(400).json({ error: "Missing or invalid 'category' parameter" });
    return;
  }

  const news = await NewsService.getNewsByCategory(category as string);

  if (!news || news.length === 0) {
    res.status(404).json({ error: "No news found for this category" });
    return;
  }

  res.json(news);
  return;
};

export const create = async (req: Request, res: Response) => {
  const created = await NewsService.createNews(req.body);
  res.status(201).json(created);
  return;
};

export const update = async (req: Request, res: Response) => {
  const updated = await NewsService.updateNews(Number(req.params.id), req.body);
  res.json(updated);
  return;
};

export const remove = async (req: Request, res: Response) => {
  await NewsService.deleteNews(Number(req.params.id));
  res.status(204).send();
  return;
};

export const search = async (req: Request, res: Response) => {
  const results = await NewsService.searchNews(req.query.q as string);
  res.json(results);
  return;
};
