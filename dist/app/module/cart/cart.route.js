"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cart_validation_1 = require("./cart.validation");
const cart_controller_1 = require("./cart.controller");
const user_constant_1 = require("../user/user.constant");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// create
router.post("/", (0, validateRequest_1.default)(cart_validation_1.CartValidationSchema.createCartValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartControllers.createCart);
// get all
router.get("/", (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartControllers.getAllCarts);
// get single by user
router.get("/user/:email", (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartControllers.getCartsByUser);
// update
router.put("/:id", (0, validateRequest_1.default)(cart_validation_1.CartValidationSchema.updateCartValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartControllers.updateCart);
// delete
router.delete("/:CartId", (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartControllers.deleteCart);
exports.CartRoutes = router;
