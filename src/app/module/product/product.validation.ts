import { z } from "zod";

// Create Product Schema validaiton
export const createProductValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  stockQuantity: z
    .number()
    .int()
    .nonnegative("Stock quantity cannot be negative"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Image must be a valid URL"),
});

// Update Product Schema validaiton
export const updateProductValidationSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  stockQuantity: z
    .number()
    .int()
    .nonnegative("Stock quantity cannot be negative")
    .optional(),
  category: z.string().min(1, "Category is required").optional(),
  image: z.string().url("Image must be a valid URL").optional(),
});

export const ProductValidaitonSchema = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
