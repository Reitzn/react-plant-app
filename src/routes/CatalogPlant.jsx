import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { PageItem } from "../components/shared/Items";
import { supabase } from "../supabaseClient";

export default function CatalogPlant() {
  const [plant, setPlant] = useState({});
  const { catalogPlantId } = useParams();

  useEffect(() => {
    const getPlants = async () => {
      const { data, error } = await supabase
        .from("plant_catalog")
        .select()
        .eq("id", catalogPlantId);

      if (error) {
        alert(error);
      } else {
        setPlant(data[0]);
      }
    };

    getPlants();
  }, []);

  return (
    <Container>
      <Grid container direction="row" alignItems="center">
        <Grid container item xs={10} justifyContent="flex-start">
          <h1>{plant?.common_name}</h1>
        </Grid>
        <Grid container item xs={2} justifyContent="flex-end"></Grid>
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
            </Grid>
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <h2>Optimal Conditions</h2>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <b>Sunlight:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.sunlight}
              </Grid>
              <Grid item xs={6} md={3}>
                <b>Temp Range:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.temp_low} - {plant?.temp_high}
              </Grid>
            </Grid>
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <h2>Images</h2>
          </PageItem>
        </Grid>
      </Grid>
    </Container>
  );
}
