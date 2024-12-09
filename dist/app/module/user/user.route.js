"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const user_constant_1 = require("./user.constant");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// get all users
router.get("/", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), user_controller_1.UserControllers.getAllUsers);
// get user by email
router.get("/:email", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), user_controller_1.UserControllers.getUserByEmail);
// update user
router.put("/:userId", (0, validateRequest_1.default)(user_validation_1.userSchemaValidation.updateUserValidationSchema), (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.updateUser);
// delete
router.delete("/:userId", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.deleteUser);
// // update only user own profile
// router.put(
//   "/me",
//   validateRequest(userSchemaValidation.updateUserValidationSchema),
//   auth(USER_ROLE.admin, USER_ROLE.user),
//   UserControllers.updateUser
// );
exports.UserRoutes = router;
