import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { supabase } from "../../supabaseClient";

import { useNavigate } from "react-router-dom";


const settings = ["Profile", "Account", "Dashboard", "Logout"];

const settings2 = [
    { title: "Profile", to: "/account" },
    { title: "Seeds", to: "/seeds" },
]

export default function UserDropdown() {
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

  return (
    <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings2.map((setting) => (
                <MenuItem key={setting.title} onClick={() => {
                    navigate(setting.to)
                    handleCloseUserMenu()
                }}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
               <MenuItem onClick={() => {
                    supabase.auth.signOut();
                    navigate("/")
                    handleCloseUserMenu()
                }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
  )
}