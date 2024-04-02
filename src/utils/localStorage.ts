// src/utils/localStorage.ts
import { Product } from "../models/Product.model";

export const saveProductsToLocalStorage = (products: Product[]): void => {
  try {
    const serializedProducts = JSON.stringify(products);
    localStorage.setItem("products", serializedProducts);
  } catch (error) {
    console.error("Error saving products to localStorage:", error);
  }
};

export const loadProductsFromLocalStorage = (): Product[] => {
  try {
    const serializedProducts = localStorage.getItem("products");
    return serializedProducts ? JSON.parse(serializedProducts) : [];
  } catch (error) {
    console.error("Error loading products from localStorage:", error);
    return [];
  }
};
