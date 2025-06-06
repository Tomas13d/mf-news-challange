import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { Inter } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/globals.css";
import { AuthProvider } from "@/context/useAuth";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#d32f2f" },
    secondary: { main: "#f5f5f5" },
    background: { default: "#ffffff" },
    text: { primary: "#000000" },
  },
  typography: {
    fontFamily: `"Inter", sans-serif`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </main>
  );
}
