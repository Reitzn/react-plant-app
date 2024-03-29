import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import { useSelector, useDispatch } from "react-redux";

import { updateUserAction } from "../features/user/userSlice";

import AddPlantCatalog from "../components/plantCatalog/AddPlantCatalog";

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
      <Box component="form" onSubmit={handleUpdateUser} noValidate>
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
      </Box>
      {user?.userData?.admin && (
        <>
          <AddPlantCatalog />
        </>
      )}
    </div>
  );
}
