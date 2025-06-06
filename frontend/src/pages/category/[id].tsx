"use client";

import { Box, CircularProgress } from "@mui/material";
import MainArticle from "@/components/main-article";
import SideNews from "@/components/side-news";
import { useArticleModal } from "@/context/ArticleModalContext";
import CreateEditModal from "@/components/create-edit-modal";
import { useNews } from "@/hooks/useNews";
import { useRouter } from "next/router";
import NoNews from "@/components/no-news";

export default function ArticlePage() {
  const router = useRouter();
  const { id: category } = router.query;
  const { news, loading, refetch } = useNews({
    category: category as string,
  });
  const { closeModal, isOpen } = useArticleModal();

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

   if (!news || news.length === 0) {
    return <NoNews/>
  }

  return (
    <>
      <CreateEditModal open={isOpen} handleClose={closeModal} handleRefresh={refetch} />
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
            mb: 4,
          }}
        >
          <Box>
            <MainArticle article={news[0]} />
          </Box>
          <Box>
            <SideNews articles={news.slice(1, 4)} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
