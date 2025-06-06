import { News } from "@/types/News";
import api, { handleApiCall } from "../api";

export const generateNews = async (): Promise<News> => {
  return handleApiCall(api.get("/openai/generate-news"));
};

export const improveText = async (text: string): Promise<{improved: string}> => {
  return handleApiCall(api.post("/openai/improve-text", { text }));
};
