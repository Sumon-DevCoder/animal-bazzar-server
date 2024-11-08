"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidaitonSchema = exports.updateProductValidationSchema = exports.createProductValidationSchema = void 0;
const zod_1 = require("zod");
// Create Product Schema validaiton
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
        image: zod_1.z.string().url("Image must be a valid URL"),
    }),
});
// Update Product Schema validaiton
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
        image: zod_1.z.string().url("Image must be a valid URL").optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.ProductValidaitonSchema = {
    createProductValidationSchema: exports.createProductValidationSchema,
    updateProductValidationSchema: exports.updateProductValidationSchema,
};
