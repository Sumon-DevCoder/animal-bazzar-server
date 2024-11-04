import { z } from "zod";
import mongoose from "mongoose";

const createCartValidationSchema = z.object({
  product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid product ID",
  }),
  user: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid user ID",
  }),
  totalAmount: z
    .number()
    .min(0, { message: "Total amount must be a positive number" }),
  isConfirmed: z.string().optional().default("unconfirmed"),
  isDeleted: z.boolean().optional().default(false),
});

const updateCartValidationSchema = z.object({
  product: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid product ID",
    })
    .optional(),
  user: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid user ID",
    })
    .optional(),
  totalAmount: z
    .number()
    .min(0, { message: "Total amount must be a positive number" })
    .optional(),
  isConfirmed: z.string().optional().default("unconfirmed"),
  isDeleted: z.boolean().optional(),
});

// Export the schemas
export const CartValidationSchema = {
  createCartValidationSchema,
  updateCartValidationSchema,
};
