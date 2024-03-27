import React from "react";
import Box from "@mui/material/Box";

import SeedsTable from "../components/seeds/SeedsTable";
import AddSeed from "../components/seeds/AddSeed";

export default function Seeds() {
  return (
    <div className="page">
      <h1>Seeds</h1>
      <Box mb={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <AddSeed />
      </Box>
      <SeedsTable />
    </div>
  );
}
