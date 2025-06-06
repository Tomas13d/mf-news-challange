import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { useAuth } from "@/context/useAuth";
import { useArticleModal } from "@/context/ArticleModalContext";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import Swal from "sweetalert2";
import { deleteNews } from "@/services/News";
import { Categories } from "@/types/News";
import MoreIcon from "@mui/icons-material/MoreVert";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  maxWidth: 300,
}));

const categories: Categories[] = ["Fútbol", "NBA", "Tenis"];

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { id } = router.query;
  const isArticlePage = router.pathname === "/article/[id]";
  const { openModal } = useArticleModal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
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

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={() => setMobileMoreAnchorEl(null)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          m: 0,
          flexWrap: "wrap",
        }}
      >
        {user ? (
          isArticlePage ? (
            <>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                  color: "#d32f2f",
                  borderColor: "#d32f2f",
                  ml: 1,
                }}
                onClick={openModal}
              >
                Editar Noticia
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{
                  ml: 1,
                  bgcolor: "#d32f2f",
                  color: "white",
                }}
                onClick={handleDeleteNews}
              >
                Eliminar
              </Button>
            </>
          ) : (
            <>
              <Button sx={{ color: "#d32f2f", ml: 1 }} onClick={logout}>
                Logout
              </Button>
              <Button
                variant="outlined"
                sx={{
                  ml: 1,
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
                onClick={openModal}
              >
                Nueva Noticia
              </Button>
            </>
          )
        ) : (
          <>
            <Button
              sx={{ color: "#d32f2f", ml: 1 }}
              onClick={() => router.push("/register")}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              sx={{
                ml: 1,
                borderColor: "#d32f2f",
                color: "#d32f2f",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </>
        )}
      </Box>
      {/* Puedes agregar aquí otros elementos si lo deseas */}
    </Menu>
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [search]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={() => setDrawerOpen(false)}
          >
            <Typography variant="h6" sx={{ p: 2 }}>
              Categorías
            </Typography>
            {categories.map((category) => (
              <MenuItem key={category + Date.now()}>
                <Link
                  key={category}
                  href={`/category/${category}`}
                  passHref
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography>{category}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>
        </Drawer>
        <Toolbar>
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: 700,
                ml: "-20px",
                mr: "20px",
              }}
            >
              MFNews
            </Typography>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, mr: 2, ml:2 }}>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <Typography variant="body1">{category}</Typography>
                </Link>
              ))}
            </Box>

            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "white", mr: 1 }} />
              </SearchIconWrapper>
              <StyledInputBase
                inputRef={inputRef}
                placeholder="Buscar…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit(e as any);
                  }
                }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 2,
                  flexWrap: "wrap",
                }}
              >
                {user ? (
                  isArticlePage ? (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{
                          color: "white",
                          borderColor: "white",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                          ml: 1,
                        }}
                        onClick={openModal}
                      >
                        Editar Noticia
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        sx={{
                          ml: 1,
                          bgcolor: "white",
                          color: "#d32f2f",
                          "&:hover": { bgcolor: "#f5f5f5" },
                        }}
                        onClick={handleDeleteNews}
                      >
                        Eliminar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button sx={{ color: "white", ml: 1 }} onClick={logout}>
                        Logout
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          ml: 1,
                          bgcolor: "white",
                          color: "#d32f2f",
                          "&:hover": { bgcolor: "#f5f5f5" },
                        }}
                        onClick={openModal}
                      >
                        Nueva Noticia
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    <Button
                      sx={{ color: "white", ml: 1 }}
                      onClick={() => router.push("/register")}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        ml: 1,
                        bgcolor: "white",
                        color: "#d32f2f",
                        "&:hover": { bgcolor: "#f5f5f5" },
                      }}
                      onClick={() => router.push("/login")}
                    >
                      Login
                    </Button>
                  </>
                )}
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
