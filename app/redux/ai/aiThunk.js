// File: redux/ai/aiThunk.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const generateSalesComment = createAsyncThunk(
  "ai/generateSalesComment",
  async (salesData, { rejectWithValue }) => {
    try {
      console.log("🤖 Requesting AI analysis...");
      const response = await axios.post("/api/ai", salesData);
      
      if (response.data && response.data.comment) {
        console.log("✅ AI analysis successful");
        return response.data.comment; // SUCCÈS
      } else {
        // Si réponse invalide, rejeter avec un message
        return rejectWithValue("Réponse AI invalide");
      }
      
    } catch (error) {
      console.warn("⚠️ AI service unavailable:", error.message);
      
      // Rejeter avec un message d'erreur clair
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Service AI temporairement indisponible"
      );
    }
  }
);