import { z } from "zod";
import mongoose from "mongoose";

const createCartValidationSchema = z.object({
  body: z.object({
    product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid product ID",
    }),
    user: z.string(),
    productName: z.string(),
    price: z.number(),
    isConfirmed: z.string().optional().default("unconfirmed"),
    paymentStatus: z.string().optional().default("unpaid"),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateCartValidationSchema = z.object({
  body: z.object({
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
    isConfirmed: z.string().optional().default("unconfirmed"),
    isDeleted: z.boolean().optional(),
  }),
});

// Export the schemas
export const CartValidationSchema = {
  createCartValidationSchema,
  updateCartValidationSchema,
};
