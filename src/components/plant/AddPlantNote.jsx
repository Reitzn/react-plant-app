import React, { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { LoadingButton } from "@mui/lab";

import { DatePicker } from "@mui/x-date-pickers";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { addPlantNoteAction } from "../../features/plants/plantNoteSlice";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

export default function AddPlantNote() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.userSession);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { plantId } = useParams();

  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newPlantNote = {
      user_id: userSession?.user?.id,
      plant_id: plantId,
      date: data.get("date"),
      type: data.get("type"),
      description: data.get("note"),
    };

    dispatch(addPlantNoteAction(newPlantNote));

    setIsLoading(false);
    handleClose();
  };

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

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-plant-note-title"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} direction="column">
            <Typography
              id="modal-plant-note-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Add Note
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date" name="date" defaultValue={dayjs()} />
            </LocalizationProvider>
            <TextField
              id="type"
              name="type"
              label="Type"
              variant="outlined"
              defaultValue=""
              fullWidth
            />
            <TextField name="note" label="Note" multiline rows={4} fullWidth />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              color="success"
              size="large"
              fullWidth
            >
              Add
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
