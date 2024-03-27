import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <div className="page">
      <Typography variant="h3" component="h1">
        Your Ultimate Plant Tracker
      </Typography>
      <Typography variant="h4" component="h2">
        Grow, Track, and Cultivate Your Garden with Ease
      </Typography>
      <Typography variant="h4" component="h2">
        Why React Plant App?
      </Typography>
      <Typography variant="body1" component="body1">
        React Plant App is your go-to companion for managing your seeds and
        plants. Whether you're an experienced gardener or just starting out,
        React Plant App provides the tools you need to cultivate your garden and
        watch it flourish.
      </Typography>
      <Typography variant="h5" component="h2">
        Features:
      </Typography>
      <Typography variant="body1" component="p">
        <Box fontWeight="fontWeightMedium" display="inline">
          Seed Catalog:
        </Box>
        Browse through our extensive catalog of seeds, categorized by plant type
        and season. Find the perfect additions to your garden and add them to
        your collection with a simple click.
      </Typography>
      <Typography variant="body1" component="p">
        <Box fontWeight="fontWeightMedium" display="inline">
          Plant Tracker:
        </Box>
        Keep track of all your plants' growth progress in one convenient
        location. Log watering schedules, note milestones, and monitor their
        health effortlessly.
      </Typography>
      <Typography variant="body1" component="p">
        <Box fontWeight="fontWeightMedium" display="inline">
          Customizable Reminders:
        </Box>
        Never forget to water your plants again! Set personalized reminders
        based on your plants' specific needs and receive notifications straight
        to your device.
      </Typography>
      <Typography variant="body1" component="p">
        <Box fontWeight="fontWeightMedium" display="inline">
          Community Forum:
        </Box>
        Connect with fellow gardening enthusiasts, share tips and tricks, and
        seek advice from experienced growers. Join discussions, ask questions,
        and learn from a vibrant community of plant lovers.
      </Typography>
      <Typography variant="body1" component="p">
        <Box fontWeight="fontWeightMedium" display="inline">
          Garden Journal:
        </Box>
        Document your gardening journey with our integrated journal feature.
        Capture photos, jot down observations, and record your successes (and
        challenges) as your garden evolves over time.
      </Typography>
      <Typography variant="h5" component="h4">
        Want To Help?
      </Typography>
      <Typography variant="body1" component="body1">
        Join our community and come check us out on GitHub.
      </Typography>
      [Facebook Icon] [Twitter Icon] [Instagram Icon]
    </div>
  );
}
