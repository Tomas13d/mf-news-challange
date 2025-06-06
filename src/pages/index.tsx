import { Box, CircularProgress } from "@mui/material";
import MainArticle from "@/components/main-article";
import SideNews from "@/components/side-news";
import NewsCarousel from "@/components/news-carousel";
import { useNews } from "@/hooks/useNews";

export default function Home() {
  const { news, loading, search, searching, error } = useNews({});

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

  return (
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
          <SideNews articles={news.slice(1, 5)} />
        </Box>
      </Box>

      <Box>
        <NewsCarousel articles={news.slice(5, 10)} />
      </Box>
    </Box>
  );
}
