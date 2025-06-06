import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useAuth } from "@/context/useAuth";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useArticleModal } from "@/context/ArticleModalContext";
import Swal from "sweetalert2";
import { deleteNews } from "@/services/News";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#fff", 0.15),
  marginLeft: theme.spacing(1),
  width: 0,
  overflow: "hidden",
  transition: theme.transitions.create(["width", "padding"], {
    duration: theme.transitions.duration.standard,
  }),
  "&.active": {
    width: "200px",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
}));

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { id } = router.query;
  const isArticlePage = router.pathname === "/article/[id]";
  const { openModal } = useArticleModal();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${search}`);
    }
  };

  const handleDeleteNews = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar noticia?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await deleteNews(id as string);
        Swal.fire(
          "Eliminada",
          "La noticia fue eliminada correctamente.",
          "success"
        );
        router.push("/");
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar la noticia.", "error");
      }
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#d32f2f" }}>
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            {/* LOGO */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MFNews
            </Typography>

            {/* ACCIONES */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <IconButton sx={{ color: "white" }} onClick={toggleSearch}>
                  <SearchIcon />
                </IconButton>
                <SearchContainer className={searchOpen ? "active" : ""}>
                  <StyledInputBase
                    placeholder="Buscar…"
                    inputProps={{ "aria-label": "buscar" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus={searchOpen}
                  />
                </SearchContainer>
              </Box>

              {user ? (
                isArticlePage ? (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{
                        ml: 2,
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.1)",
                        },
                      }}
                      onClick={() => {
                        const id = router.query.id;
                        openModal();
                      }}
                    >
                      Editar Noticia
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      sx={{
                        ml: 1,
                        bgcolor: "white",
                        color: "red",
                        "&:hover": {
                          bgcolor: "#f5f5f5",
                          color: "#b71c1c",
                        },
                      }}
                      onClick={handleDeleteNews}
                    >
                      Eliminar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="text"
                      color="secondary"
                      sx={{
                        ml: 2,
                        color: "white",
                      }}
                      onClick={logout}
                    >
                      logout
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{
                        ml: 2,
                        bgcolor: "white",
                        color: "#d32f2f",
                        "&:hover": {
                          bgcolor: "#f5f5f5",
                        },
                      }}
                      onClick={() => openModal()}
                    >
                      Nueva Noticia
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{
                      ml: 2,
                      color: "white",
                    }}
                    onClick={() => router.push("/register")}
                  >
                    Sing in
                  </Button>
                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    sx={{
                      ml: 2,
                      bgcolor: "white",
                      color: "#d32f2f",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                    }}
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
