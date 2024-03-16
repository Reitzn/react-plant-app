import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";

import { supabase } from "../../supabaseClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function AddSeed() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

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

    // to-do: Get this to go way after typing?!?! Finish login for error handling
    if (!email) {
      setEmailError(true);
      setEmailErrorText("Email is required");
    } else {
      setEmailError(false);
    }
    if (!password) {
      setPasswordError(true);
      setPasswordErrorText("Password is required");
    } else {
      setPasswordError(false);
    }
    if (!email || !password) {
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
      >
        Add Seed
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-login-title"
      >
        <Box component="form" onSubmit={handleLogin} noValidate sx={style}>
          <Stack spacing={2} direction="column">
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
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />
            <LoadingButton
              variant="contained"
              loading={loading}
              type="submit"
              fullWidth
            >
              Login
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
