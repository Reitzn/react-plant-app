import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

const initialState = {
  loading: false,
  error: "",
  userData: {},
};

export const getUserAction = createAsyncThunk(
  "user/getUserAction",
  async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .single();

    return data;
  },
);

export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async (updates) => {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(updates)
      .select()
      .single();

    return data;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get User
    builder.addCase(getUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = "";
    });
    builder.addCase(getUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userData = null;
      state.error = action.error.message || "";
    });

    // Update User
    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = "";
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userData = null;
      state.error = action.error.message || "";
    });
  },
});

// Action creators are generated for each case reducer function
// export const { setUserSession } = userSlice.actions;

export default userSlice.reducer;
