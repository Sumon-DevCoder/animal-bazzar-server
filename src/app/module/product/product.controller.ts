import { StatusCodes } from "http-status-codes";
import { ProductServices } from "./product.service";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";

// create
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product added successfully",
    data: result,
  });
});

// get all
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// get single
const getSingleProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getSingleProductFromDB(
    req.params.productId
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// update
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.updateProductIntoDB(
    req.params.ProductId,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// delete
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.deleteProductIntoDB(
    req.params.ProductId
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  deleteProduct,
  updateProduct,
  createProduct,
  getAllProducts,
  getSingleProducts,
};
