import { z } from "zod";

// Create Product Schema validation
export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    isDeleted: z.boolean().default(false).optional(),
    stockQuantity: z
      .number()
      .int()
      .nonnegative("Stock quantity cannot be negative"),
    category: z.string().min(1, "Category is required"),
    img: z.array(z.string().url("Each image must be a valid URL")), // Array of image URLs
    age: z.object({
      value: z.number().min(0, "Age value must be a positive number"), // Ensure value is a positive number
      unit: z
        .enum(["day", "week", "month", "year"])
        .refine((val) => ["day", "week", "month", "year"].includes(val), {
          message: "Invalid age unit", // Custom error message
        }),
    }),
    like: z
      .number()
      .int()
      .nonnegative("Like count cannot be negative")
      .default(0), // Ensure like count is non-negative
    color: z.string().min(1, "Color is required"), // Color is required
    size: z.object({
      value: z.number().positive("Size value must be positive"), // Ensure size value is positive
      unit: z.enum(["kg", "gm"]).refine((val) => ["kg", "gm"].includes(val), {
        message: "Invalid size unit", // Custom error message
      }),
    }),
    // Availability must be one of these
  }),
});

// Update Product Schema validation
export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    stockQuantity: z
      .number()
      .int()
      .nonnegative("Stock quantity cannot be negative")
      .optional(),
    category: z.string().min(1, "Category is required").optional(),
    img: z.array(z.string().url("Each image must be a valid URL")).optional(), // Array of image URLs
    age: z
      .object({
        value: z
          .number()
          .min(0, "Age value must be a positive number")
          .optional(),
        unit: z.enum(["day", "week", "month", "year"]).optional(),
      })
      .optional(),
    like: z
      .number()
      .int()
      .nonnegative("Like count cannot be negative")
      .default(0)
      .optional(), // Optional like count
    color: z.string().min(1, "Color is required").optional(), // Optional color
    size: z
      .object({
        value: z.number().positive("Size value must be positive").optional(),
        unit: z.enum(["kg", "gm"]).optional(),
      })
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const ProductValidationSchema = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
