"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaValidation = exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "name is required").trim(),
        role: zod_1.z
            .enum([user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user], {
            required_error: "role is required",
        })
            .optional(),
        phone: zod_1.z.string().min(1, "Phone number is required"),
        address: zod_1.z.string().min(1, "address is required"),
        email: zod_1.z
            .string()
            .email("Invalid email address")
            .min(1, "email is required")
            .trim(),
        password: zod_1.z
            .string()
            .min(6, "password must be at least 6 characters")
            .min(1, "password is required"),
        img: zod_1.z.string().min(1, "img is required"),
        status: zod_1.z
            .enum([user_constant_1.USER_STATUS.active, user_constant_1.USER_STATUS.blocked], {
            required_error: "status is required",
        })
            .optional(), // Default status, so it's optional
    }),
});
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().trim().optional(), // Optional for updates
        role: zod_1.z
            .enum([user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user], {
            required_error: "role is required",
        })
            .optional(), // Optional for updates
        email: zod_1.z.string().email("Invalid email address").trim().optional(), // Optional for updates
        phone: zod_1.z.number().min(1, "Phone number is required").optional(),
        address: zod_1.z.string().min(1, "address is required").optional(),
        password: zod_1.z.string().optional(), // Optional for updates
        img: zod_1.z.string().optional(), // Optional for updates
        status: zod_1.z
            .enum([user_constant_1.USER_STATUS.active, user_constant_1.USER_STATUS.blocked], {
            required_error: "status is required",
        })
            .optional(), // Optional for updates
    })
        .partial(), // Makes all fields optional automatically
});
exports.userSchemaValidation = {
    createUserValidationSchema: exports.createUserValidationSchema,
    updateUserValidationSchema: exports.updateUserValidationSchema,
};
