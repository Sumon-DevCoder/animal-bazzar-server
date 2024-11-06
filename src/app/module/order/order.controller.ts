import { Request, Response } from "express";
import { orderService } from "./order.service";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";
import { StatusCodes } from "http-status-codes";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
      error,
    });
  }
};

// get all
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrderFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// update
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const result = await orderService.updateOrderIntoDB(orderId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.deleteOrderIntoDB(req.params.orderId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});

export const OrderControler = {
  getAllOrders,
  deleteOrder,
  updateOrder,
};
