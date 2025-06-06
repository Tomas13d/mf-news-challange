import { Request, Response } from "express";
import * as OpenAIService from "../../services/openAI";

export const improveTextController = async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: "Text is required" });
    return;
  }
    const improved = await OpenAIService.improveText(text);
    res.json({ improved });
    return;
};

export const generateNewsController = async (req: Request, res: Response) => {
    const news = await OpenAIService.generateRandomNews();
    res.json(news);
    return;
};
