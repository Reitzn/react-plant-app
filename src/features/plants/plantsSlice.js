import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

const initialState = {
  loading: false,
  error: "",
  plantsData: [],
};

// Get Plants
export const getPlantsAction = createAsyncThunk(
  "plants/getPlantsAction",
  async (userId) => {
    const { data, error } = await supabase
      .from("plants")
      .select()
      .eq("user_id", userId);

    return data;
  }
);

// Add Plant
export const addPlantAction = createAsyncThunk(
  "plants/addPlantAction",
  async (newPlant) => {
    const { data, error } = await supabase
      .from("plants")
      .insert(newPlant)
      .select()
      .single();

    return data;
  }
);

// Delete Plant
export const deletePlantAction = createAsyncThunk(
  "plants/deletePlantAction",
  async (plantId) => {
    const { error } = await supabase.from("plants").delete().eq("id", plantId);

    return plantId;
  }
);

// Update Plant
export const updatePlantAction = createAsyncThunk(
  "plants/updatePlantAction",
  async (updatedPlant) => {
    const { data, error } = await supabase
      .from("plants")
      .update(updatedPlant)
      .eq("id", updatedPlant.id)
      .select()
      .single();

    return data;
  }
);

export const plantsSlice = createSlice({
  name: "plants",
  initialState: initialState,
  reducers: {
  },
  extraReducers(builder) {
    // Get plants
    builder.addCase(getPlantsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlantsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.plantsData = action.payload;
    });
    builder.addCase(getPlantsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Add Plant
    builder.addCase(addPlantAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPlantAction.fulfilled, (state, action) => {
      state.loading = false;
      state.plantsData.push(action.payload);
    });
    builder.addCase(addPlantAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Delete Plant
    builder.addCase(deletePlantAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePlantAction.fulfilled, (state, action) => {
      state.loading = false;
      state.plantsData = state.plantsData.filter(
        (plant) => plant.id !== action.payload
      );
    });
    builder.addCase(deletePlantAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Update Plant
    builder.addCase(updatePlantAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePlantAction.fulfilled, (state, action) => {
      state.loading = false;
      state.plantsData = state.plantsData.map((plant) =>
        plant.id === action.payload.id ? action.payload : plant
      );
    });
    builder.addCase(updatePlantAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

export default plantsSlice.reducer;
