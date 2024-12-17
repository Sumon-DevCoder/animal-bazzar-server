"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = exports.updateProductValidationSchema = exports.createProductValidationSchema = void 0;
const zod_1 = require("zod");
// Create Product Schema validation
exports.createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        price: zod_1.z.number().min(0, "Price must be a positive number"),
        isDeleted: zod_1.z.boolean().default(false).optional(),
        stockQuantity: zod_1.z
            .number()
            .int()
            .nonnegative("Stock quantity cannot be negative"),
        category: zod_1.z.string().min(1, "Category is required"),
        img: zod_1.z.array(zod_1.z.string().url("Each image must be a valid URL")), // Array of image URLs
        age: zod_1.z.object({
            value: zod_1.z.number().min(0, "Age value must be a positive number"), // Ensure value is a positive number
            unit: zod_1.z
                .enum(["day", "week", "month", "year"])
                .refine((val) => ["day", "week", "month", "year"].includes(val), {
                message: "Invalid age unit", // Custom error message
            }),
        }),
        like: zod_1.z
            .number()
            .int()
            .nonnegative("Like count cannot be negative")
            .default(0), // Ensure like count is non-negative
        color: zod_1.z.string().min(1, "Color is required"), // Color is required
        size: zod_1.z.object({
            value: zod_1.z.number().positive("Size value must be positive"), // Ensure size value is positive
            unit: zod_1.z.enum(["kg", "gm"]).refine((val) => ["kg", "gm"].includes(val), {
                message: "Invalid size unit", // Custom error message
            }),
        }),
        // Availability must be one of these
    }),
});
// Update Product Schema validation
exports.updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        price: zod_1.z.number().min(0, "Price must be a positive number").optional(),
        stockQuantity: zod_1.z
            .number()
            .int()
            .nonnegative("Stock quantity cannot be negative")
            .optional(),
        category: zod_1.z.string().min(1, "Category is required").optional(),
        img: zod_1.z.array(zod_1.z.string().url("Each image must be a valid URL")).optional(), // Array of image URLs
        age: zod_1.z
            .object({
            value: zod_1.z
                .number()
                .min(0, "Age value must be a positive number")
                .optional(),
            unit: zod_1.z.enum(["day", "week", "month", "year"]).optional(),
        })
            .optional(),
        like: zod_1.z
            .number()
            .int()
            .nonnegative("Like count cannot be negative")
            .default(0)
            .optional(), // Optional like count
        color: zod_1.z.string().min(1, "Color is required").optional(), // Optional color
        size: zod_1.z
            .object({
            value: zod_1.z.number().positive("Size value must be positive").optional(),
            unit: zod_1.z.enum(["kg", "gm"]).optional(),
        })
            .optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.ProductValidationSchema = {
    createProductValidationSchema: exports.createProductValidationSchema,
    updateProductValidationSchema: exports.updateProductValidationSchema,
};
