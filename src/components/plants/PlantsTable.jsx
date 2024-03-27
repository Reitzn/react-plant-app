import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from "dayjs";

import { useSelector, useDispatch } from "react-redux";
import { deletePlantAction } from "../../features/plants/plantsSlice";

export default function PlantsTable() {
  const plants = useSelector((state) => state.plants);
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="plants table">
        <TableHead>
          <TableRow>
            <TableCell>Plant</TableCell>
            <TableCell align="right">Scientific Name</TableCell>
            <TableCell align="right">Date Potted</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plants?.plantsData?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.common_name}
              </TableCell>
              <TableCell align="right">{row.scientific_name}</TableCell>
              <TableCell align="right">{row.date_potted}</TableCell>
            
              <TableCell align="right">
                <IconButton
                  aria-label="edit"
                  onClick={() => dispatch(deletePlantAction(row.id))}
                >
                  {/* <MoreVertIcon /> */}
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
