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
      .select(`username, website, avatar_url`)
      .eq("id", userId)
      .single();

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
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
  },
});

// Action creators are generated for each case reducer function
// export const { setUserSession } = userSlice.actions;

export default userSlice.reducer;
