import React from "react";

import SeedsTable from "../components/seeds/SeedsTable";
import AddSeed from "../components/seeds/AddSeed";

export default function Seeds() {
  return (
    <div className="page">
      <h1>Seeds</h1>
      <AddSeed />
      <SeedsTable />
    </div>
  );
}
