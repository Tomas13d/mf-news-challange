import type React from "react"

import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
import Link from "next/link"

const categories = ["Fútbol", "Tenis", "NBA"]

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "#d32f2f" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo para desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MFNews
          </Typography>

          {/* Menú móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{category}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo para móvil */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MFNews
          </Typography>

          {/* Menú desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {categories.map((category) => (
              <Button key={category} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                {category}
              </Button>
            ))}
          </Box>

          {/* Botón de búsqueda */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ color: "white" }}>
              <SearchIcon />
            </IconButton>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                ml: 1,
                bgcolor: "white",
                color: "#d32f2f",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              Nueva Noticia
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
