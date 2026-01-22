import { createSlice } from "@reduxjs/toolkit";
import { generateSalesComment } from "./aiThunk";

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    comment: "",
    loading: false,
    error: null
  },
  reducers: {
    clearComment(state) {
      state.comment = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSalesComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.comment = ""; // Clear previous comment
      })
      .addCase(generateSalesComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload; // Le commentaire AI
        state.error = null;
      })
      .addCase(generateSalesComment.rejected, (state, action) => {
        state.loading = false;
        // Utilisez action.payload (de rejectWithValue) au lieu de action.error.message
        state.error = action.payload || "Erreur inconnue";
        // Optionnel : ajoutez un commentaire de fallback même en cas d'erreur
        // state.comment = `📊 Analyse de base : ${action.meta.arg?.soldProducts || 0} ventes réalisées.`;
      });
  }
});

export const { clearComment } = aiSlice.actions;
export default aiSlice.reducer;