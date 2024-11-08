"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
// Route to create an order
router.post("/create", order_controller_1.createOrderController);
// get all
router.get("/", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControler.getAllOrders);
// get all user
router.get("/:email", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), order_controller_1.OrderControler.getAllOrdersByUser);
// update
router.put("/:orderId", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControler.updateOrder);
// delete
router.delete("/:orderId", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControler.deleteOrder);
exports.OrderRoutes = router;
