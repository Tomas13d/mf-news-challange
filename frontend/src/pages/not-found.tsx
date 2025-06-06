import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
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
        maxWidth="md"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: { xs: 6, md: 8 },
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          404 - Página no encontrada
        </Typography>

        <Typography variant="body1" paragraph>
          Lo sentimos, la noticia o página que estás buscando no existe o ha
          sido movida.
        </Typography>

        <Button
          component={Link}
          href="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
        >
          Volver a la portada
        </Button>
      </Container>
    </Box>
  );
}
