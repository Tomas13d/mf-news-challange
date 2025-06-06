import { Request, Response } from "express";
import * as OpenAIService from "../../services/openAI";

export const improveTextController = async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: "Text is required" });
    return;
  }

  try {
    const improved = await OpenAIService.improveText(text);
    res.json({ improved });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to improve text" });
    return;
  }
};

export const generateNewsController = async (_req: Request, res: Response) => {
  try {
    const news = await OpenAIService.generateRandomNews();
    res.json(news);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate news" });
    return;
  }
};
