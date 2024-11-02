import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import { PaymentServices } from "./payment.service";
import sendResponse from "../../utiils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getPaymentByUser = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.params;

  const result = await PaymentServices.getPaymentByUserFromDB(userEmail);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});

export const PaymentControllers = {
  getPaymentByUser,
};
