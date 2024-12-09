import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userSchemaValidation } from "./user.validation";
import { UserControllers } from "./user.controller";
import { USER_ROLE } from "./user.constant";
import { auth } from "../../middlewares/auth";

const router = Router();

// get all users
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getAllUsers
);

// get user by email
router.get(
  "/:email",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getUserByEmail
);

// update user
router.put(
  "/:userId",
  validateRequest(userSchemaValidation.updateUserValidationSchema),
  auth(USER_ROLE.admin),
  UserControllers.updateUser
);

// delete
router.delete("/:userId", auth(USER_ROLE.admin), UserControllers.deleteUser);

// // update only user own profile
// router.put(
//   "/me",
//   validateRequest(userSchemaValidation.updateUserValidationSchema),
//   auth(USER_ROLE.admin, USER_ROLE.user),
//   UserControllers.updateUser
// );

export const UserRoutes = router;
