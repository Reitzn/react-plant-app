import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
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

import {
  updatePlantNoteAction,
  deletePlantNoteAction,
} from "../../features/plants/plantNoteSlice";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

export default function EditPlantNote(props) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.userSession);
  const plantNotes = useSelector((state) => state.plantNotes);

  const { plantNoteId } = props;
  const plantNote = plantNotes?.plantNotesData?.find(
    (plantNote) => plantNote?.id === plantNoteId
  );

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { plantId } = useParams();

  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newPlantNote = {
      id: plantNote?.id,  
      user_id: userSession?.user?.id,
      plant_id: plantId,
      date: data.get("date"),
      type: data.get("type"),
      description: data.get("note"),
    };

    dispatch(updatePlantNoteAction(newPlantNote));

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
      <IconButton onClick={() => setOpen(true)} aria-label="edit">
        <EditNoteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-edit-plant-note-title"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} direction="column">
            <Typography
              id="modal-edit-plant-note-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Edit Note
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                name="date"
                defaultValue={dayjs(plantNote?.date)}
              />
            </LocalizationProvider>
            <TextField
              id="type"
              name="type"
              label="Type"
              variant="outlined"
              defaultValue={plantNote?.type}
              fullWidth
            />
            <TextField
              name="note"
              label="Note"
              defaultValue={plantNote?.description}
              multiline
              rows={4}
              fullWidth
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              color="success"
              size="large"
              fullWidth
            >
              Save
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              color="error"
              size="large"
              fullWidth
              onClick={() => dispatch(deletePlantNoteAction(plantNote?.id))}
            >
              Delete
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
