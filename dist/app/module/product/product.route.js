"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const router = (0, express_1.Router)();
// create
router.post("/", (0, validateRequest_1.default)(product_validation_1.ProductValidaitonSchema.createProductValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductControllers.createProduct);
// get all
router.get("/", product_controller_1.ProductControllers.getAllProducts);
// get single
router.get("/:productId", product_controller_1.ProductControllers.getSingleProducts);
// update
router.put("/:id", (0, validateRequest_1.default)(product_validation_1.ProductValidaitonSchema.updateProductValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductControllers.updateProduct);
// delete
router.delete("/:productId", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
