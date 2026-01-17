import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ADD PRODUCT
export const ajouterProduit = createAsyncThunk(
  "products/ajouterProduit",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Delete product
export const deleteProduct = createAsyncThunk (
  "products/deleteProduct",
  async (id, {rejectWithValue}) => {
    try {
       await axios.delete(`http://localhost:3001/products/${id}`);
      return id;

    } catch (error) {
      return rejectWithValue (error.message)
    }
  }
);

//Update product
export const UpdateProduct = createAsyncThunk (
  "products/updateProduct",
  async ({id, updateData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`http://localhost:3001/products/${id}`,updateData);
      return response.data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

//fetch product by id
export const fetchById = createAsyncThunk (
  "products/fetchById",
  async (id, ThunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:3001/products/${id}`);
      return res.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
)