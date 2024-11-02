import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { userSchemaValidation } from "../user/user.validation";
import { loginUserSchemaValidation } from "./auth.validation";

const router = Router();

// register
router.post(
  "/signup",
  validateRequest(userSchemaValidation.createUserValidationSchema),
  AuthControllers.RegisterUser
);

// login
router.post(
  "/login",
  validateRequest(loginUserSchemaValidation),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
