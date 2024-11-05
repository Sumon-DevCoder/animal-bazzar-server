import { initiatePayment } from "../payment/payment.utils";
import { Order } from "./order.model";

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
    status: "Pending",
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

export const orderService = {
  createOrder,
};
