// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    products: productReducer, // Register the product reducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
