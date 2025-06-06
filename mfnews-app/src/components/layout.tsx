import { Box, Container } from "@mui/material";
import Header from "./header";
import Footer from "./footer";
import { ArticleModalProvider } from "@/context/ArticleModalContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ArticleModalProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Header />
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            py: { xs: 2, md: 3 },
          }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </ArticleModalProvider>
  );
}
