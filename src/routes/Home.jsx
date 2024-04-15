import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import GitHubIcon from "@mui/icons-material/GitHub";

import PlantImg from "../img/plant_homepage.png";

export const PageItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function Home() {
  return (
    <div className="page">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid container xs={12} md={7}>
          <Typography variant="h3" component="h1" gutterBottom>
            Your Ultimate Plant Tracker
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Grow, Track, and Cultivate Your Garden with Ease
          </Typography>
        </Grid>
        <Grid
          container
          xs={12}
          md={5}
          alignItems="center"
          justifyContent="center"
        >
          <img alt="" src={PlantImg} style={{ maxWidth: "100%" }} />
        </Grid>
      </Grid>
      <Typography variant="h4" component="h2" gutterBottom>
        Why React Plant App?
      </Typography>
      <Typography variant="body1" component="body1" gutterBottom>
        React Plant App is your go-to companion for managing your seeds and
        plants. Whether you're an experienced gardener or just starting out,
        React Plant App provides the tools you need to cultivate your garden and
        watch it flourish.
      </Typography>

      {/* Features Section */}
      <Box mt={6} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, md: 2 }}>
        <Grid item xs={12} sm={1}>
          <PageItem>
            <Typography variant="h6" gutterBottom>
              Plant Catalog
            </Typography>
            <Typography variant="body1" component="p">
              Browse through our extensive catalog of plants. Find the perfect
              additions to your garden and add them to your collection with a
              simple click.
            </Typography>
          </PageItem>
        </Grid>
        <Grid item xs={12} md={1}>
          <PageItem>
            <Typography variant="h6" gutterBottom>
              Seed Tracker
            </Typography>
            <Typography variant="body1" component="p">
              Keep track of all your seeds' germination progress in one
              convenient location. Track germination rates, time, and up-pot to
              a plant.
            </Typography>
          </PageItem>
        </Grid>
        <Grid item xs={12} md={1}>
          <PageItem>
            <Typography variant="h6" gutterBottom>
              Plant Tracker
            </Typography>
            <Typography variant="body1" component="p">
              Keep track of all your plants' growth progress in one convenient
              location. Log watering schedules, note milestones, and monitor
              their health effortlessly.
            </Typography>
          </PageItem>
        </Grid>
        <Grid item xs={12} md={1}>
          <PageItem>
            <Typography variant="h6" gutterBottom>
              Community
            </Typography>
            <Typography variant="body1" component="p">
              Connect with fellow gardening enthusiasts, share tips and tricks,
              and seek advice from experienced growers. Join discussions, ask
              questions, and learn from a vibrant community of plant lovers.
            </Typography>
          </PageItem>
        </Grid>
      </Grid>

      {/* GitHub Section */}
      <Box mt={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          Want To Help?
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" component="p" gutterBottom>
            Join our community and come check us out on GitHub. Everything is
            open source so if you want to help out or add features feel free!
          </Typography>
        </Grid>
        <Grid
          container
          xs={12}
          md={6}
          height={200}
          alignItems="center"
          justifyContent="center"
        >
          <a
            href="https://github.com/Reitzn/react-plant-app"
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit" }}
          >
            <GitHubIcon fontSize="large" style={{ transform: "scale(4)" }} />
          </a>
        </Grid>
      </Grid>
    </div>
  );
}
