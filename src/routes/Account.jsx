import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { Container, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import PlantCatalogTable from "../components/plantCatalog/PlantCatalogTable";
import { useSelector, useDispatch } from "react-redux";

import { updateUserAction } from "../features/user/userSlice";

import AddPlantCatalog from "../components/plantCatalog/AddPlantCatalog";
import Avatar from "../components/account/Avatar";

export default function Account() {
  const user = useSelector((state) => state.user);
  const userSession = useSelector((state) => state.userSession);
  const dispatch = useDispatch();

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const updatedUser = {
      id: userSession.user.id,
      username: data.get("username"),
      full_name: data.get("full_name"),
    };

    dispatch(updateUserAction(updatedUser));
  };

  return (
    <div className="page">
      <Typography variant="h3" component="h1">
        Welcome
      </Typography>
      <Grid container spacing={4} mt={2}>
        <Grid container xs={12} md={6} justifyContent="center">
          <Avatar />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleUpdateUser} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                defaultValue={userSession?.user?.email}
                disabled
                variant="outlined"
              />
              <TextField
                label="User Name"
                name="username"
                defaultValue={user?.userData?.username}
                variant="outlined"
              />
              <TextField
                label="Name"
                name="full_name"
                defaultValue={user?.userData?.full_name}
                variant="outlined"
              />

              <LoadingButton
                variant="contained"
                loading={user?.loading}
                type="submit"
              >
                Update
              </LoadingButton>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {user?.userData?.admin && (
        <Box mt={3}>
          <Typography variant="h4" component="h2" gutterBottom>
            Admin Panel
          </Typography>
          <Box
            mb={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" component="h3" gutterBottom>
              Plant Catalog
            </Typography>
          </Box>
          <Box
            mb={3}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <AddPlantCatalog />
          </Box>
          <PlantCatalogTable />
        </Box>
      )}
    </div>
  );
}
