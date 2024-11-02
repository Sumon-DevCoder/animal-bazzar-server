import { z } from "zod";
import { USER_ROLE, USER_STATUS } from "./user.constant";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name is required").trim(),
    role: z
      .enum([USER_ROLE.admin, USER_ROLE.user], {
        required_error: "role is required",
      })
      .optional(),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "address is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "email is required")
      .trim(),
    password: z
      .string()
      .min(6, "password must be at least 6 characters")
      .min(1, "password is required"),
    img: z.string().min(1, "img is required"),
    status: z
      .enum([USER_STATUS.active, USER_STATUS.blocked], {
        required_error: "status is required",
      })
      .optional(), // Default status, so it's optional
  }),
});

export const updateUserValidationSchema = z.object({
  body: z
    .object({
      name: z.string().trim().optional(), // Optional for updates
      role: z
        .enum([USER_ROLE.admin, USER_ROLE.user], {
          required_error: "role is required",
        })
        .optional(), // Optional for updates
      email: z.string().email("Invalid email address").trim().optional(), // Optional for updates
      phone: z.number().min(1, "Phone number is required").optional(),
      address: z.string().min(1, "address is required").optional(),
      password: z.string().optional(), // Optional for updates
      img: z.string().optional(), // Optional for updates
      status: z
        .enum([USER_STATUS.active, USER_STATUS.blocked], {
          required_error: "status is required",
        })
        .optional(), // Optional for updates
    })
    .partial(), // Makes all fields optional automatically
});

export const userSchemaValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
