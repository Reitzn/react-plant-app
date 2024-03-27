import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
 
import {addSeedAction} from "../../features/seeds/seedsSlice"

import { supabase } from "../../supabaseClient";

import { useSelector, useDispatch } from "react-redux";
import { addSeed } from "../../features/seeds/seedsSlice";

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
  const userSession = useSelector((state) => state.userSession);

  const dispatch = useDispatch();

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

    const newSeed = {
      user_id: userSession.user.id,
      common_name: data.get("common_name"),
      scientific_name: data.get("scientific_name"),
      date_sowed: data.get("date_sowed"),
    };

    console.log(newSeed);
    setLoading(true)
    dispatch(addSeedAction(newSeed));
    setLoading(false)
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
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
              Add Seed
            </Typography>
            <TextField
              required
              label="Common Name"
              name="common_name"
              fullWidth
              autoFocus
            />
            <TextField
              required
              fullWidth
              label="Scientific Name"
              name="scientific_name"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Sowed"
                name="date_sowed"
                defaultValue={dayjs()}
              />
            </LocalizationProvider>
            <LoadingButton
              variant="contained"
              loading={loading}
              type="submit"
              fullWidth
            >
              Make It
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
