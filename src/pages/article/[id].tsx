"use client";

import { Box, CircularProgress } from "@mui/material";
import { useNewsItem } from "@/hooks/useNewsItem";
import { notFound } from "next/navigation";
import MainArticle from "@/components/main-article";
import SideNews from "@/components/side-news";
import { useEffect, useState } from "react";
import { News } from "@/types/News";
import { getNews } from "@/services/News";
import { useRouter } from "next/router";
import { useArticleModal } from "@/context/ArticleModalContext";
import CreateEditModal from "@/components/create-edit-modal";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const { newsItem, loading, error, refetch } = useNewsItem(id as string);
  const { closeModal, isOpen } = useArticleModal();
  const [relatedNews, setRelatedNews] = useState<News[]>([]);

  useEffect(() => {
    const loadRelatedNews = async () => {
      if (!newsItem) return;

      try {
        const allNews = await getNews();
        const related = allNews
          .filter(
            (item) =>
              item.id !== newsItem.id &&
              item.category.toLowerCase() === newsItem.category.toLowerCase()
          )
          .slice(0, 3);

        setRelatedNews(related);
      } catch (err) {
        console.error("Error loading related news:", err);
      }
    };

    loadRelatedNews();
  }, [newsItem]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (!newsItem || error) {
    notFound();
  }

  return (
    <>
      <CreateEditModal
        open={isOpen}
        onClose={closeModal}
        initialData={newsItem}
        refetch={refetch}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box>
            <MainArticle article={newsItem} />
          </Box>
          <Box>
            <SideNews articles={relatedNews} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
