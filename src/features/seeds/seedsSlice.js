import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

const initialState = {
  loading: false,
  error: "",
  seedsData: [],
};

// Get Seeds
export const getSeedsAction = createAsyncThunk(
  "seeds/getSeedsAction",
  async (userId) => {
    const { data, error } = await supabase
      .from("seeds")
      .select()
      .eq("user_id", userId);

    return data;
  }
);

// Add Seed
export const addSeedAction = createAsyncThunk(
  "seeds/addSeedAction",
  async (newSeed) => {
    const { data, error } = await supabase
      .from("seeds")
      .upsert(newSeed)
      .select()
      .single();

    return data;
  }
);

// Delete Seed
export const deleteSeedAction = createAsyncThunk(
  "seeds/deleteSeedAction",
  async (seedId) => {
    const { error } = await supabase.from("seeds").delete().eq("id", seedId);

    return seedId;
  }
);

// Update Seed
export const updateSeedAction = createAsyncThunk(
  "seeds/updateSeedAction",
  async (updatedSeed) => {
    const { data, error } = await supabase
      .from("seeds")
      .update(updatedSeed)
      .eq("id", updatedSeed.id)
      .select()
      .single();

    return data;
  }
);

export const seedsSlice = createSlice({
  name: "seeds",
  initialState: initialState,
  reducers: {
  },
  extraReducers(builder) {
    // Get Seeds
    builder.addCase(getSeedsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSeedsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.seedsData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getSeedsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Add Seed
    builder.addCase(addSeedAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSeedAction.fulfilled, (state, action) => {
      state.loading = false;
      state.seedsData.push(action.payload);
    });
    builder.addCase(addSeedAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Delete Seed
    builder.addCase(deleteSeedAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSeedAction.fulfilled, (state, action) => {
      state.loading = false;
      state.seedsData = state.seedsData.filter(
        (seed) => seed.id !== action.payload
      );
    });
    builder.addCase(deleteSeedAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    // Update Seed
    builder.addCase(updateSeedAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSeedAction.fulfilled, (state, action) => {
      state.loading = false;
      state.seedsData = state.seedsData.map((seed) =>
        seed.id === action.payload.id ? action.payload : seed
      );
    });
    builder.addCase(updateSeedAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

export default seedsSlice.reducer;
