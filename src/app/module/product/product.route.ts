import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { roomSchemaValidation } from "./product.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { RoomControllers } from "./product.controller";

const router = Router();

// create
router.post(
  "/",
  validateRequest(roomSchemaValidation.createRoomSchemaValidation),
  auth(USER_ROLE.admin),
  RoomControllers.createRoom
);

// get all
router.get("/", RoomControllers.getAllRooms);

// get single
router.get("/:roomId", RoomControllers.getSingleRooms);

// update
router.put(
  "/:roomId",
  validateRequest(roomSchemaValidation.updateRoomSchemaValidation),
  auth(USER_ROLE.admin),
  RoomControllers.updateRoom
);

// delete
router.delete("/:roomId", auth(USER_ROLE.admin), RoomControllers.deleteRoom);

export const RoomRoutes = router;
