import api, { ApiError, handleApiCall } from "../api";
import { News } from "@/types/News";

export const getNews = async (): Promise<News[]> => {
  return handleApiCall(api.get("/news"));
};

export const getNewsById = async (id: string | number): Promise<News> => {
  return handleApiCall(api.get(`/news/${id}`));
};

export const getNewsByCategory = async (category: string): Promise<News[]> => {
  return handleApiCall(api.get(`/news/category/${category}`));
};

export const createNews = async (data: Omit<News, "id">): Promise<News> => {
  return handleApiCall(api.post("/news", data));
};

export const updateNews = async (
  id: string | number,
  data: Partial<Omit<News, "id">>
): Promise<News> => {
  return handleApiCall(api.patch(`/news/${id}`, data));
};

export const deleteNews = async (id: string | number): Promise<void> => {
  try {
    await api.delete(`/news/${id}`);
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("Error al eliminar la noticia.", {
      originalError: error,
    });
  }
};

export const searchNews = async (query: string): Promise<News[]> => {
  return handleApiCall(api.get("/news/search", { params: { q: query } }));
};
