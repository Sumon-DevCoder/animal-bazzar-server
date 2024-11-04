import { StatusCodes } from "http-status-codes";
import { CartServices } from "./cart.service";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";

// create
const createCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.createCartIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart added successfully",
    data: result,
  });
});

// get all
const getAllCarts = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.getAllCartFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart retrieved successfully",
    data: result,
  });
});

// get single
const getSingleCarts = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.getSingleCartFromDB(req.params.CartId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart retrieved successfully",
    data: result,
  });
});

// update
const updateCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.updateCartIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart updated successfully",
    data: result,
  });
});

// delete
const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.deleteCartIntoDB(req.params.CartId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart deleted successfully",
    data: result,
  });
});

export const CartControllers = {
  deleteCart,
  updateCart,
  createCart,
  getAllCarts,
  getSingleCarts,
};
