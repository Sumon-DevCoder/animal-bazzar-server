import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { initiatePayment } from "../payment/payment.utils";
import { IOrder, Order } from "./order.model";

const createOrder = async (orderData: any) => {
  const { user, products } = orderData;

  const transactionId = `TXN-${Date.now()}`;
  const totalPrice = products.reduce(
    (prev: any, current: { price: any }) => prev + current.price,
    0
  );

  const order = new Order({
    user,
    totalPrice,
    status: "unconfirmed",
    paymentStatus: "Pending",
    transactionId,
  });

  await order.save();

  const paymentData = {
    transactionId,
    totalPrice,
    custormerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone,
    customerAddress: user.address,
  };

  //payment
  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

// get all
const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const orderQuery = new QueryBuilder(Order.find().populate("user"), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Order Available!");
  }

  return {
    meta,
    result,
  };
};

// update
const updateOrderIntoDB = async (_id: string, payload: Partial<IOrder>) => {
  // Order checking

  const result = await Order.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  console.log(result);

  return result;
};

const deleteOrderIntoDB = async (_id: string) => {
  // Order checking
  const OrderData = await Order.findById({ _id });
  if (!OrderData) {
    throw new AppError(StatusCodes.CONFLICT, "Order not exists!");
  }

  const result = await Order.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const orderService = {
  createOrder,
  getAllOrderFromDB,
  updateOrderIntoDB,
  deleteOrderIntoDB,
};
