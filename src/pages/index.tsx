import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import api from "../utils/api";
import { News } from "../types/News";
import NewsCard from "../components/NewsCard";

export default function HomePage() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    api
      .get("/news")
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Noticias
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {news.map((n) => (
          <Box key={n.id} flexBasis={{ xs: "100%", sm: "48%", md: "30%" }}>
            <NewsCard news={n} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
