"use client"

import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material"
import Link from "next/link"
import { News } from "@/types/News"

interface NewsGridProps {
  articles: News[]
}

export default function NewsGrid({ articles }: NewsGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        gap: 3,
      }}
    >
      {articles.map((article) => (
        <Box key={article.id.toString()}>
          <Link href={`/article/${article.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardMedia component="img" height="200" image={article.imageUrl} alt={article.title} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" color="error" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                    {article.category}
                  </Typography>
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.summary}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    {article.author}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Link>
        </Box>
      ))}
    </Box>
  )
}
