import { useState, useEffect } from "react";
import { getNewsById, updateNews, deleteNews } from "../services/News";
import { News } from "@/types/News";
import { ApiError } from "@/services/api";

export function useNewsItem(id: string | number) {
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof ApiError) {
      setError(err.message);
    } else {
      setError("Ocurrió un error inesperado.");
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNewsById(id);
      setNewsItem(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (updates: Partial<Omit<News, "id">>) => {
    setUpdating(true);
    setError(null);
    try {
      const updated = await updateNews(id, updates);
      setNewsItem(updated);
    } catch (err) {
      handleError(err);
    } finally {
      setUpdating(false);
    }
  };

  const remove = async () => {
    setDeleting(true);
    setError(null);
    try {
      await deleteNews(id);
      setNewsItem(null); // Se eliminó correctamente
    } catch (err) {
      handleError(err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  return {
    newsItem,
    loading,
    updating,
    deleting,
    error,
    update,
    remove,
    refetch: fetchNews,
  };
}
