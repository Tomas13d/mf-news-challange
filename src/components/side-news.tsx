import { Box, Typography, Card, CardContent, CardMedia, Stack, Divider } from "@mui/material"
import Link from "next/link"
import { News } from "@/types/News"

interface SideNewsProps {
  articles: News[]
}

export default function SideNews({ articles }: SideNewsProps) {
  return (
    <Stack spacing={2} sx={{mt: 4}}>
      {articles.map((article, index) => (
        <Link href={`/article/${article.id}`} key={article.id.toString()} style={{ textDecoration: "none", color: "inherit" }}>
          <Card
            sx={{
              display: "flex",
              boxShadow: "none",
              bgcolor: "#f9f9f9",
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", flex: "1 0 auto" }}>
              <CardContent sx={{ flex: "1 0 auto", p: 2 }}>
                <Typography
                  component="div"
                  variant="subtitle2"
                  color="error"
                  sx={{ textTransform: "uppercase", fontWeight: "bold", mb: 0.5 }}
                >
                  {article.category}
                </Typography>
                <Typography component="div" variant="subtitle1" fontWeight="medium">
                  {article.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 1 }}>
                  {article.author}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100, objectFit: "cover" }}
              image={article.imageUrl}
              alt={article.title}
            />
          </Card>
          {index < articles.length - 1 && <Divider />}
        </Link>
      ))}
    </Stack>
  )
}
