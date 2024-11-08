"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidationSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const createCartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        product: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: "Invalid product ID",
        }),
        user: zod_1.z.string(),
        productName: zod_1.z.string(),
        price: zod_1.z.number(),
        isConfirmed: zod_1.z.string().optional().default("unconfirmed"),
        paymentStatus: zod_1.z.string().optional().default("unpaid"),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateCartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        product: zod_1.z
            .string()
            .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: "Invalid product ID",
        })
            .optional(),
        user: zod_1.z
            .string()
            .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: "Invalid user ID",
        })
            .optional(),
        isConfirmed: zod_1.z.string().optional().default("unconfirmed"),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
// Export the schemas
exports.CartValidationSchema = {
    createCartValidationSchema,
    updateCartValidationSchema,
};
