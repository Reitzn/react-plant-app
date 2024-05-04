import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function PlantCatalogTable() {
  const [plants, setPlants] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getPlants = async () => {
      const data = await supabase.from("plant_catalog").select("*");
      setPlants(data?.data);
    };

    getPlants();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="plant catalog table">
        <TableHead>
          <TableRow>
            <TableCell>Plant</TableCell>
            <TableCell>Scientific Name</TableCell>
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
              <TableCell>{row.scientific_name}</TableCell>
              <TableCell align="right">
                <Button variant="text" onClick={() => navigate(row.id)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
