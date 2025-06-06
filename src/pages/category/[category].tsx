import { Box, Container, Typography, Divider, CircularProgress } from "@mui/material";
import NewsGrid from "@/components/news-grid";
import { useNews } from "@/hooks/useNews";
import { useRouter } from "next/router";

export default async function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { news, loading, searching, error } = useNews({
    category: category as string,
  });

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    > 
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          {category}
        </Typography>

        <Divider sx={{ mb: { xs: 2, md: 3 } }} />

        <NewsGrid articles={news} />
      </Container>
    </Box>
  );
}
