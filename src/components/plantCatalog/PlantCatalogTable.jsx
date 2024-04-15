import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import dayjs from "dayjs";

import { useSelector, useDispatch } from "react-redux";
import { deletePlantAction } from "../../features/plants/plantsSlice";

export default function PlantCatalogTable() {
  // const plants = useSelector((state) => state.pl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [plants, setPlants] = useState();

  useEffect(() => {
    const getPlants = async () => {
      const data = await supabase.from("plant_catalog").select("*");
      setPlants(data?.data);
    };

    getPlants();
  }, []);

  console.log(plants);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="plant catalog table">
        <TableHead>
          <TableRow>
            <TableCell>Plant</TableCell>
            <TableCell align="right">Scientific Name</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plants?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.common_name}
              </TableCell>
              <TableCell align="right">{row.scientific_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
