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

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

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
    if (!confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText("Confirm password is required");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText("Passwords must match");
    } else {
      setConfirmPasswordError(false);
    }

    // useState errors are not false yet, so this is not working.
    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);
    handleClose();

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email to verify your account!");
    }
  };

  return (
    <div>
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        onClick={handleOpen}
      >
        Sign Up
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-login-title"
      >
        <Box component="form" onSubmit={handleLogin} noValidate sx={style}>
          <Stack spacing={2} direction="column">
            <Typography id="modal-login-title" variant="h6" component="h2">
              Create Account
            </Typography>
            <TextField
              required
              fullWidth
              autoFocus
              label="Email Address"
              name="email"
              type="email"
              helperText={emailErrorText}
              error={emailError}
            />
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              helperText={passwordErrorText}
              error={passwordError}
            />
            <TextField
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              helperText={confirmPasswordErrorText}
              error={confirmPasswordError}
            />
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              fullWidth
            >
              Lets Go
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
