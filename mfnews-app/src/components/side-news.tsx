import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { News } from "@/types/News";

interface SideNewsProps {
  articles: News[];
}

export default function SideNews({ articles }: SideNewsProps) {
  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      {articles.map((article, index) => (
        <Link
          href={`/article/${article.id}`}
          key={article.id.toString()}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "none",
              bgcolor: "#f9f9f9",
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            <Box sx={{ flex: 1, pr: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  component="div"
                  variant="subtitle2"
                  color="error"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    mb: 0.5,
                  }}
                >
                  {article.category}
                </Typography>
                <Typography
                  component="div"
                  variant="subtitle1"
                  fontWeight="medium"
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="div"
                  sx={{ mt: 1 }}
                >
                  {article.author}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{
                width: 90,
                height: 90,
                borderRadius: 1,
                objectFit: "cover",
                mr: 2,
              }}
              image={article.imageUrl}
              alt={article.title}
            />
          </Card>

          {index < articles.length - 1 && <Divider />}
        </Link>
      ))}
    </Stack>
  );
}
