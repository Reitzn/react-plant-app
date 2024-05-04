import React from "react";

import DataGridDemo from "../components/plantCatalog/DataGridDemo";
import PlantCatalogTable from "../components/plantCatalog/PlantCatalogTable";

export default function PlantCatalog() {
  return (
    <div className="page">
      <h1>Plant Catalog</h1>
      <PlantCatalogTable />
    </div>
  );
}
