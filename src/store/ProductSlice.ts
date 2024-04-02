// src/store/store.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/Product.model";
import {
  loadProductsFromLocalStorage,
  saveProductsToLocalStorage,
} from "../utils/localStorage";

// Define the initial state for the product list
interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: loadProductsFromLocalStorage(),
};

// Create a Redux slice for the product list
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      saveProductsToLocalStorage(state.products); // Save to localStorage
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
        saveProductsToLocalStorage(state.products); // Save to localStorage
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveProductsToLocalStorage(state.products); // Save to localStorage
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
