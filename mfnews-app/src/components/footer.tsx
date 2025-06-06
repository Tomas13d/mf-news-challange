import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Divider,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#333", color: "white", py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
            },
            gap: 4,
            alignItems: "start",
          }}
        >
         
          <Box>
            <Typography variant="h6" gutterBottom>
              MFNews
            </Typography>
            <Typography variant="body2">
              Tu portal de noticias deportivas de confianza. Mantente informado
              con las últimas noticias del mundo del deporte.
            </Typography>
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

    
          <Box
            sx={{
              justifySelf: { sm: "end" },
              textAlign: { sm: "right", xs: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Redes
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: { sm: "flex-end", xs: "flex-start" },
              }}
            >
              <IconButton
                component="a"
                href="https://www.instagram.com/tu_cuenta"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com/tu_cuenta"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://facebook.com/tu_cuenta"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://youtube.com/tu_canal"
                target="_blank"
                rel="noopener"
                sx={{ color: "white" }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Mind Factory News. Todos los derechos
          reservados.
        </Typography>
      </Container>
    </Box>
  );
}
