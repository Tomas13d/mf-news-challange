// pages/search.tsx
import { useRouter } from "next/router";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNews } from "@/hooks/useNews";
import { useArticleModal } from "@/context/ArticleModalContext";
import CreateEditModal from "@/components/create-edit-modal";
import MainArticle from "@/components/main-article";
import SideNews from "@/components/side-news";

export default function SearchPage() {
  const router = useRouter();
  const searchQuery = router.query.q as string;
  const { news, loading, search, searching, refetch } = useNews({});
  const { closeModal, isOpen } = useArticleModal();

  useEffect(() => {
    if (searchQuery) {
      search(searchQuery);
    }
  }, [searchQuery]);

  if (loading || searching) {
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

  return (
    <>
      <CreateEditModal open={isOpen} handleClose={closeModal} handleRefresh={refetch}/>
      <Box>
        <Typography variant="h4" mb={2}>
          Resultados de búsqueda para: "{searchQuery}"
        </Typography>

        {news.length === 0 ? (
          <Typography variant="body1">No se encontraron resultados.</Typography>
        ) : (
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
        )}
      </Box>
    </>
  );
}
