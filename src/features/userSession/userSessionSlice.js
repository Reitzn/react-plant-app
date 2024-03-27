import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { supabase } from "../../supabaseClient";

import { useSelector, useDispatch } from "react-redux";
import {getUserAction} from "../user/userSlice"


const initialState = {};

export const userSessionSlice = createSlice({
  name: "userSession",
  initialState: initialState,
  reducers: {
    setUserSession: (state, action) => {
      // state = ?? test this
      return action.payload;
    },
    removeUserSession: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserSession, removeUserSession } = userSessionSlice.actions;

export default userSessionSlice.reducer;
