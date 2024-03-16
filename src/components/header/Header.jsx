import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import ForestIcon from "@mui/icons-material/Forest";

import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import MobileMenu from "./MobileMenu";

import Login from "./Login";
import SignUp from "./SignUp";
import UserDropdown from "./UserDropdown";
import ColorModeToggle from "./ColorModeToggle";

import { authRoutes } from "../../utils/const";

function ResponsiveAppBar() {
  const { session } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ForestIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            React Plant App
          </Typography>
          <MobileMenu />
          <ForestIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RPA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {session &&
              authRoutes.map((route) => (
                <Button
                  key={route.to}
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(route.to);
                  }}
                >
                  {route.title}
                </Button>
              ))}
          </Box>
          <Stack spacing={2} direction="row">
            <ColorModeToggle />
            {session ? (
              <UserDropdown />
            ) : (
              <>
                <SignUp />
                <Login />
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
