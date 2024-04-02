// src/components/ProductList.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/ProductSlice";
import { RootState } from "../store/store";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    if (editProductId) {
      dispatch(updateProduct({ id: editProductId, ...data }));
    } else {
      dispatch(addProduct({ id: Date.now().toString(), ...data }));
    }
    setOpen(false);
    setEditProductId(null);
    reset();
  };

  const handleAddProduct = () => {
    setEditProductId(null);
    setOpen(true);
  };

  const handleEditProduct = (productId: string) => {
    setEditProductId(productId);
    setOpen(true);
    const product = products.find((p) => p.id === productId);
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
      });
    }
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        Add Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editProductId ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Description"
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Price"
              type="number"
              {...register("price", { required: "Price is required", min: 0 })}
              error={!!errors.price}
              helperText={errors.price?.message}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Quantity"
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: 0,
              })}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ProductList;
