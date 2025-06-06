import { useState, useEffect } from "react";
import { getNews, searchNews, getNewsByCategory } from "../services/News";
import { News } from "@/types/News";
import { ApiError } from "@/services/api";

export function useNews({ category }: { category?: string }) {
  const [news, setNews] = useState<News[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof ApiError) {
      setError(err.message);
    } else {
      setError("Ocurrió un error inesperado.");
    }
  };

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: News[];
      if (category && category.trim() !== "") {
        data = await getNewsByCategory(category);
      } else {
        data = await getNews();
      }
      setNews(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const search = async (q: string) => {
    setQuery(q);
    if (!q) return loadAll();

    setSearching(true);
    setError(null);
    try {
      const data = await searchNews(q);
      setNews(data);
    } catch (err) {
      handleError(err);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = async () => {
    setQuery("");
    await loadAll();
  };

  useEffect(() => {
    loadAll();
  }, [category]); 

  return {
    news,
    query,
    loading,
    searching,
    error,
    search,
    clearSearch,
    refetch: loadAll,
  };
}
