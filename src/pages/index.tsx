import { Box, CircularProgress, Typography } from "@mui/material";
import MainArticle from "@/components/main-article";
import SideNews from "@/components/side-news";
import NewsCarousel from "@/components/news-carousel";
import { useNews } from "@/hooks/useNews";
import CreateEditModal from "@/components/create-edit-modal";
import { useArticleModal } from "@/context/ArticleModalContext";
import NoNews from "@/components/no-news";

export default function Home() {
  const { news, loading, refetch } = useNews({});
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
      <CreateEditModal open={isOpen} onClose={closeModal} refetch={refetch} />
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

        <Box>
          <NewsCarousel articles={news.slice(4, 10)} />
        </Box>
      </Box>
    </>
  );
}

