import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from "dayjs";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteSeedAction,
  updateSeedAction,
} from "../../features/seeds/seedsSlice";

export default function SeedsTable() {
  const seeds = useSelector((state) => state.seeds);
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plant</TableCell>
            <TableCell align="right">Date Sowed</TableCell>
            <TableCell align="right">Date Germinated</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seeds?.seedsData?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.common_name}
              </TableCell>
              <TableCell align="right">{row.date_sowed}</TableCell>
              <TableCell align="right">
                {row.date_germinated ? (
                  row.date_germinated
                ) : (
                  <Button
                    variant="text"
                    onClick={() => {
                      const today = dayjs().toString();
                      console.log(today);
                      dispatch(
                        updateSeedAction({ ...row, date_germinated: today })
                      );
                    }}
                  >
                    Seed Germinated
                  </Button>
                )}
              </TableCell>
              <TableCell align="right">
                <Button variant="text">Pot Up</Button>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="edit"
                  onClick={() => dispatch(deleteSeedAction(row.id))}
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
