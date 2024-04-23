import React from "react";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { PageItem } from "../components/shared/Items";
import { useSelector } from "react-redux";

import ImageSection from "../components/plant/ImageSection";
import PlantNotes from "../components/plant/PlantNotes";

export default function PlantPage() {
  const plants = useSelector((state) => state.plants);
  const { plantId } = useParams();
  const plant = plants?.plantsData?.find((plant) => plant.id === plantId);

  return (
    <Container>
      <Grid container direction="row" alignItems="center">
        <Grid container item xs={10} justifyContent="flex-start">
          <h1>{plant?.common_name}</h1>
        </Grid>
        <Grid container item xs={2} justifyContent="flex-end">
          {/* <EditPlantMenu /> */}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PageItem>
            <img
              src={plant?.main_img_url}
              alt=""
              style={{ maxWidth: "-webkit-fill-available", maxHeight: "250px" }}
            />
          </PageItem>
        </Grid>
        <Grid item xs={12} md={6}>
          <PageItem>
            <h2>About</h2>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <b>Variety:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.common_name}
              </Grid>
              <Grid item xs={6} md={3}>
                <b>Scientific Name:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.scientific_name}
              </Grid>
              <Grid item xs={6} md={3}>
                <b>Potted On:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.date_potted}
              </Grid>
              <Grid item xs={6} md={3}>
                <b>Origin Seed:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.seed_id}
              </Grid>
            </Grid>
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <h2>Notes</h2>
            <PlantNotes plantId={plantId} />
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <h2>Images</h2>
            <ImageSection plant={plant} />
          </PageItem>
        </Grid>
      </Grid>
    </Container>
  );
}
