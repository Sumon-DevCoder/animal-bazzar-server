import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";

// get all
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin Data fetched successfully",
    data: result,
  });
});

// get single user
const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserByEmailFromDB(req.params.email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Data fetched successfully",
    data: result,
  });
});

// update
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await UserServices.updateUserIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.deleteUserIntoDB(req.params.userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
};
