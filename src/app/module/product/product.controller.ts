import { StatusCodes } from "http-status-codes";
import { RoomServices } from "./product.service";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";

// create
const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createRoomIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Room added successfully",
    data: result,
  });
});

// get all
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getAllRoomFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Room retrieved successfully",
    data: result,
  });
});

// get single
const getSingleRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getSingleRoomFromDB(req.params.roomId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Room retrieved successfully",
    data: result,
  });
});

// update
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.updateRoomIntoDB(
    req.params.roomId,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Room updated successfully",
    data: result,
  });
});

// delete
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.deleteRoomIntoDB(req.params.roomId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Room deleted successfully",
    data: result,
  });
});

export const RoomControllers = {
  deleteRoom,
  updateRoom,
  createRoom,
  getAllRooms,
  getSingleRooms,
};
