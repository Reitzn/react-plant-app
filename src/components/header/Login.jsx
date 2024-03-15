import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { supabase } from "../../supabaseClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });    
    console.log("Sign in");

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  };

  return (
    <div>
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-login-title"
      >
        <Box component="form" onSubmit={handleLogin} sx={style}>
         <Typography id="modal-login-title" variant="h6" component="h2">
            Login
          </Typography>
          <TextField
            required
            label="Email Address"
            name="email"
            autoComplete="email"
            fullWidth
            autoFocus
          />
          {/* <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          /> */}
          <Button type="submit" fullWidth>
            Login
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
