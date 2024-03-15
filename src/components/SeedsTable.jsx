import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const seedData = [
  {
    name: "Santaka",
    dateSowed: "3/13/23",
    datePopped: null,
  },
  {
    name: "Santaka",
    dateSowed: "3/13/23",
    datePopped: null,
  },
  {
    name: "Santaka",
    dateSowed: "3/13/23",
    datePopped: null,
  },
  {
    name: "Santaka",
    dateSowed: "3/13/23",
    datePopped: null,
  },
];

export default function SeedsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plant</TableCell>
            <TableCell align="right">Date Sowed</TableCell>
            <TableCell align="right">Date Popped</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seedData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.dateSowed}</TableCell>
              <TableCell align="right">
                {row.datePopped ? (
                  row.datePopped
                ) : (
                  <Button variant="text">Seed Popped</Button>
                )}
              </TableCell>
              <TableCell align="right">
                <Button variant="text">Pot Up</Button>
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit">
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
