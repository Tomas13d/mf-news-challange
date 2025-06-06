import { Box, Container, Typography, Link as MuiLink, Divider } from "@mui/material"
import Link from "next/link"

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#333", color: "white", py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              MFNews
            </Typography>
            <Typography variant="body2">
              Tu portal de noticias deportivas de confianza. Mantente informado con las últimas noticias del mundo del
              deporte.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Secciones
            </Typography>
            <MuiLink component={Link} href="/category/futbol" color="inherit" sx={{ display: "block", mb: 1 }}>
              Fútbol
            </MuiLink>
            <MuiLink component={Link} href="/category/tenis" color="inherit" sx={{ display: "block", mb: 1 }}>
              Tenis
            </MuiLink>
            <MuiLink component={Link} href="/category/baloncesto" color="inherit" sx={{ display: "block", mb: 1 }}>
              Baloncesto
            </MuiLink>
            <MuiLink component={Link} href="/category/formula-1" color="inherit" sx={{ display: "block", mb: 1 }}>
              Fórmula 1
            </MuiLink>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" paragraph>
              Email: contacto@mfnews.com
            </Typography>
            <Typography variant="body2">Teléfono: +34 123 456 789</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Mind Factory News. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  )
}
