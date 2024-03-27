import React from "react";
import Box from "@mui/material/Box";

import AddPlant from "../components/plants/AddPlant";
import PlantsTable from "../components/plants/PlantsTable";

export default function Plants() {
  return (
    <div className="page">
      <h1>Plants</h1>
      <Box
        mb={3}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <AddPlant />
      </Box>
      <PlantsTable />
    </div>
  );
}
