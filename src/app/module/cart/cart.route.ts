import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CartValidationSchema } from "./cart.validation";
import { CartControllers } from "./cart.controller";
import { USER_ROLE } from "../user/user.constant";
import { auth } from "../../middlewares/auth";
const router = Router();

// create
router.post(
  "/",
  validateRequest(CartValidationSchema.createCartValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  CartControllers.createCart
);

// get all
router.get(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  CartControllers.getAllCarts
);

// get single
router.get(
  "/:CartId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  CartControllers.getSingleCarts
);

// update
router.put(
  "/:id",
  validateRequest(CartValidationSchema.updateCartValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  CartControllers.updateCart
);

// delete
router.delete(
  "/:CartId",
  auth(USER_ROLE.user, USER_ROLE.admin),
  CartControllers.deleteCart
);

export const CartRoutes = router;
