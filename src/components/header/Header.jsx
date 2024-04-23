import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ForestIcon from "@mui/icons-material/Forest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MobileMenu from "./MobileMenu";
import Login from "./Login";
import SignUp from "./SignUp";
import UserDropdown from "./UserDropdown";
import ColorModeToggle from "./ColorModeToggle";

import { authRoutes } from "../../utils/const";

function ResponsiveAppBar() {
  const userSession = useSelector((state) => state.userSession);
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
            {userSession?.user &&
              authRoutes.map((route) => (
                <Button
                  key={route.to}
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => {
                    navigate(route.to);
                  }}
                >
                  {route.title}
                </Button>
              ))}
          </Box>
          <Stack spacing={2} direction="row">
            <ColorModeToggle />
            {userSession?.user ? (
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
