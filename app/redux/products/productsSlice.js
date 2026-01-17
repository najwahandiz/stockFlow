import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, ajouterProduit,deleteProduct, UpdateProduct, fetchById } from "./productsThunks";


const initialState = {
  products: [],
  selectedProduct : null,
  loading: false,
  error: null,
  success: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleVendu(state, action) {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.status = product.status === "vendu" ? "disponible" : "vendu";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD PRODUCT
      .addCase(ajouterProduit.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(ajouterProduit.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload);
      })
      .addCase(ajouterProduit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled,(state, action) =>{
        state.loading = false;
          state.products = state.products.filter(p => p.id !== action.payload);
      })

      //update product
      .addCase(UpdateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) =>{
        state.loading = false;
        const index = state.products.findIndex(p=>p.id === action.payload.id)

        if(index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(UpdateProduct.rejected, (state,action) =>{
        state.loading = false ;
        state.error = action.payload;
      })

      //fetch product by id
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchById.fulfilled,(state, action)=>{
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchById.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })

 
  },
});

export const { toggleVendu } = productsSlice.actions;
export default productsSlice.reducer;
