import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import { ColorModeContext } from "../../context/ColorModeContext";

export default function ColorModeToggle() {
  const { mode, togglColorMode } = useContext(ColorModeContext);

  return (
    <>
      <IconButton
        onClick={() => togglColorMode()}
        aria-label={mode === "light" ? "Light Mode" : "Dark Mode"}
        component="label"
      >
        {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </>
  );
}
