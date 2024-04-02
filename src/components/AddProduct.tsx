// src/components/AddProduct.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/ProductSlice";
import { Product } from "../models/Product.model";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";

interface AddProductProps {
  open: boolean;
  onClose: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    dispatch(addProduct(product));
    onClose();
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      quantity: 0,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          value={newProduct.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          value={newProduct.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="quantity"
          label="Quantity"
          type="number"
          value={newProduct.quantity}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
