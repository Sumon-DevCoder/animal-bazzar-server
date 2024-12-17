import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ProductControllers } from "./product.controller";
import { ProductValidationSchema } from "./product.validation";

const router = Router();

// create
router.post(
  "/",
  validateRequest(ProductValidationSchema.createProductValidationSchema),
  auth(USER_ROLE.admin),
  ProductControllers.createProduct
);

// get all
router.get("/", ProductControllers.getAllProducts);

// get single
router.get("/:productId", ProductControllers.getSingleProducts);

// update
router.put(
  "/:id",
  validateRequest(ProductValidationSchema.updateProductValidationSchema),
  auth(USER_ROLE.admin),
  ProductControllers.updateProduct
);

// delete
router.delete(
  "/:productId",
  auth(USER_ROLE.admin),
  ProductControllers.deleteProduct
);

export const ProductRoutes = router;
