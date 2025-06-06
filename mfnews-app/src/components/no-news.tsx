import { Box, Typography } from "@mui/material";

const NoNews = () => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        No hay noticias disponibles aún
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Estamos trabajando para traerte las últimas novedades. ¡Vuelve pronto!
      </Typography>
    </Box>
  );
};

export default NoNews;
