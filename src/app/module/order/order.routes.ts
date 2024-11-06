import { Router } from "express";
import { createOrderController, OrderControler } from "./order.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// Route to create an order
router.post("/create", createOrderController);

// get all
router.get("/", auth(USER_ROLE.admin), OrderControler.getAllOrders);

// update
router.put("/:orderId", auth(USER_ROLE.admin), OrderControler.updateOrder);

// delete
router.delete("/:orderId", auth(USER_ROLE.admin), OrderControler.deleteOrder);

export const OrderRoutes = router;
