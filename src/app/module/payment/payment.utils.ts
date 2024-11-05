import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(process.env.PAYMENT_URL!, {
      store_id: config.STORE_ID,
      signature_key: config.SIGNETURE_KEY,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
      cancel_url: "http://localhost:5173/",
      amount: paymentData.totalPrice,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.custormerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: paymentData.customerPhone,
      type: "json",
    });

    //console.log(response);
    return response.data;
  } catch (err) {
    throw new Error("Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.PAYMENT_VERIFY_URL!, {
      params: {
        store_id: config.STORE_ID,
        signature_key: config.SIGNETURE_KEY,
        type: "json",
        request_id: tnxId,
      },
    });

    console.log("response.data", response.data);

    return response.data;
  } catch (err) {
    throw new Error("Payment validation failed!");
  }
};
