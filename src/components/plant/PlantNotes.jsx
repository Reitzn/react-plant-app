import React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Typography from "@mui/material/Typography";
import AddPlantNote from "./AddPlantNote";
import EditPlantNote from "./EditPlantNote";
import { useSelector } from "react-redux";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  const plantNotes = useSelector((state) => state.plantNotes);

  // To-Do: Sort by date

  return (
    <Root>
      {plantNotes?.plantNotesData?.map((plantNote) => (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {plantNote?.type}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {plantNote?.date}
              </Typography>
              <EditPlantNote plantNoteId={plantNote?.id} />
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {plantNote?.description}
            </Typography>
          </Box>
        </>
      ))}
      <AddPlantNote />
    </Root>
  );
}
