import Payment from "./payment.mode";

// get all payment user specific
const getPaymentByUserFromDB = async (cus_email: string) => {
  const result = await Payment.find({ cus_email });
  return result;
};

export const PaymentServices = {
  getPaymentByUserFromDB,
};
