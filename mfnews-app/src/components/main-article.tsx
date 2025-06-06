"use client"

import { Paper, Typography, Box, Chip, Divider } from "@mui/material"
import Image from "next/image"
import { News } from "@/types/News"
import { formatDate } from "@/utils/formatDate"

interface MainArticleProps {
  article: News
}

export default function MainArticle({ article }: MainArticleProps) {
  return (
    <Paper elevation={0} sx={{ p: 0, overflow: "hidden" }}>
      <Box sx={{ mb: 2 }}>
        <Chip
          label={article.category}
          size="small"
          sx={{
            bgcolor: "#d32f2f",
            color: "white",
            fontWeight: "bold",
            mb: 1,
          }}
        />
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          {article.title}
        </Typography>
      </Box>

      <Box sx={{ position: "relative", width: "100%", height: 400, mb: 2 }}>
        <Image
          src={article.imageUrl || "/placeholder.svg"}
          alt={article.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, color: "text.secondary", fontSize: "0.875rem" }}
      >
        <Typography variant="caption">
          Compartir, enviar o guardar: use los iconos compartir, correo o marcador
        </Typography>
        <Typography variant="caption">Actualizado: {formatDate(article.date)}</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="body1" paragraph>
        {article.summary}
      </Typography>

      <Typography variant="body1">{article.body}</Typography>
    </Paper>
  )
}
