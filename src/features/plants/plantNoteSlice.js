import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

const initialState = {
  loading: false,
  error: "",
  plantNotesData: [],
};

// Get Plant Notes
export const getPlantNoteAction = createAsyncThunk(
  "plantNotes/getPlantNotesAction",
  async (userId) => {
    const { data, error } = await supabase
      .from("plant_notes")
      .select()
      .eq("user_id", userId);

    return data;
  },
);

// Add Plant Note
export const addPlantNoteAction = createAsyncThunk(
  "plantNotes/addPlantNoteAction",
  async (newPlantNote) => {
    const { data, error } = await supabase
      .from("plant_notes")
      .insert(newPlantNote)
      .select()
      .single();

    return data;
  },
);

// Delete Plant Note
export const deletePlantNoteAction = createAsyncThunk(
  "plantNotes/deletePlantNoteAction",
  async (plantNoteId) => {
    const { error } = await supabase
      .from("plant_notes")
      .delete()
      .eq("id", plantNoteId);

    return plantNoteId;
  },
);

// Update Plant Note
export const updatePlantNoteAction = createAsyncThunk(
  "plantNotes/updatePlantNoteAction",
  async (updatedPlantNote) => {
    const { data, error } = await supabase
      .from("plant_notes")
      .update(updatedPlantNote)
      .eq("id", updatedPlantNote.id)
      .select()
      .single();

    return data;
  },
);

export const plantNotesSlice = createSlice({
  name: "plantNotes",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    // Get Plant Notes
    builder.addCase(getPlantNoteAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlantNoteAction.fulfilled, (state, action) => {
      state.loading = false;
      state.plantNotesData = action.payload;
    });
    builder.addCase(getPlantNoteAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Add Plant Note
    builder.addCase(addPlantNoteAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPlantNoteAction.fulfilled, (state, action) => {
      state.loading = false;
      state.plantNotesData.push(action.payload);
    });
    builder.addCase(addPlantNoteAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Delete Plant Note
    builder.addCase(deletePlantNoteAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePlantNoteAction.fulfilled, (state, action) => {
      state.loading = false;
      state.plantNotesData = state.plantNotesData.filter(
        (plantNote) => plantNote.id !== action.payload,
      );
    });
    builder.addCase(deletePlantNoteAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Update Plant Note
    builder.addCase(updatePlantNoteAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePlantNoteAction.fulfilled, (state, action) => {
      state.loading = false;
      state.plantNotesData = state.plantNotesData.map((plantNote) =>
        plantNote.id === action.payload.id ? action.payload : plantNote,
      );
    });
    builder.addCase(updatePlantNoteAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

export default plantNotesSlice.reducer;
