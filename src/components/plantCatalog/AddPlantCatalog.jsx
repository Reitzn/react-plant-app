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

export default function AddPlantCatalog() {
  const [open, setOpen] = useState(false);
  const [loading, isLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNewPlant = async (event) => {
    event.preventDefault();
    const fromData = new FormData(event.currentTarget);

    const newPlant = {
      common_name: fromData.get("common_name"),
      scientific_name: fromData.get("scientific_name"),
    };

    isLoading(true);
    const { data, error } = await supabase
      .from("plant_catalog")
      .insert(newPlant)
      .select()
      .single();

    isLoading(false);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Plant
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-new-plant-catalog-title"
      >
        <Box component="form" onSubmit={handleNewPlant} sx={style}>
          <Stack spacing={2} direction="column">
            <Typography
              id="modal-new-plant-catalog-title"
              variant="h6"
              component="h2"
            >
              Add Plant
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
            <LoadingButton
              variant="contained"
              type="submit"
              loading={loading}
              fullWidth
            >
              Add It
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
