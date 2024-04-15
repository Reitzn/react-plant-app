import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import seedsReducer from "./features/seeds/seedsSlice";
import userSessionReducer from "./features/userSession/userSessionSlice";
import plantReducer from "./features/plants/plantsSlice";
import plantNotesReducer from "./features/plants/plantNoteSlice";

export const setupStore = preloadedState => {
  return configureStore({
  reducer: {
    userSession: userSessionReducer,
    user: userReducer,
    seeds: seedsReducer,
    plants: plantReducer,
    plantNotes: plantNotesReducer,
  },
  preloadedState
})};
