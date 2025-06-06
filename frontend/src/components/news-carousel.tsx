import { useState } from "react"
import { Box, IconButton, Typography, Card, CardMedia, CardContent } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Link from "next/link"
import { News } from "@/types/News"

interface NewsCarouselProps {
  articles: News[]
}

export default function NewsCarousel({ articles }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(articles.length / itemsPerPage)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const visibleArticles = articles.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)

  return (
    <Box sx={{ position: "relative", mt: 4, mb: 2 }}>
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: -20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {visibleArticles.map((article) => (
          <Box key={article.id.toString()}>
            <Link href={`/article/${article.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardMedia component="img" height="180" image={article.imageUrl} alt={article.title} />
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="error"
                    sx={{ textTransform: "uppercase", fontWeight: "bold", mb: 0.5 }}
                  >
                    {article.category}
                  </Typography>
                  <Typography variant="subtitle1" component="div" fontWeight="medium">
                    {article.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                    {article.author}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  )
}
