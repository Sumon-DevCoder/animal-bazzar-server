/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";

import { USER_ROLE } from "../user/user.constant";
import { auth } from "../../middlewares/auth";
import { PaymentControllers } from "./payment.controller";
import axios from "axios";

const router = Router();

// create payment initiate post by amar pay
router.post("/initiate", async (req, res) => {
  const { amount, currency } = req.body;

  console.log("req.body", req.body);

  //  recive data form client
  const requestedData = {
    store_id: "aamarpaytest",
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    cus_name: "Imtiaz Akil",
    cus_email: "imtiaz.akil@softbd.com",
    cus_phone: "01870762472",
    cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    amount: "10.00",
    tran_id: "14YToischo",
    currency: "BDT",
    success_url: "http://localhost:5001/api/payment/verify",
    fail_url: "https://example.com/fail.php",
    cancel_url: "https://example.com/cancel.php",
    desc: "Lend Money",
    type: "json",
  };

  try {
    const response = await axios.post(
      "https://sandbox.amarpay.com/initiate",
      requestedData
    );
    res.json({ url: response.data.url }); // Redirect user to this URL to complete the payment

    console.log("response body", response);
  } catch (error) {
    res.status(500).json({ error: "Payment initiation failed" });

    console.log(error);
  }
});

router.post("/verify", async (req, res) => {
  const { transactionID } = req.body;

  console.log("vv", req.body);

  try {
    const response = await axios.get(
      `https://sandbox.amarpay.com/verify?transactionID=${transactionID}`
    );
    res.json(response.data); // Handle and store payment status
  } catch (error) {
    res.status(500).json({ error: "Payment verification failed" });
  }
});

// Get payment data specific to user
router.get(
  "/:userEmail",
  auth(USER_ROLE.admin, USER_ROLE.user),
  PaymentControllers.getPaymentByUser
);

// Create payment by sslcommerz
// router.post("/", async (req, res) => {
//   const {
//     amount,
//     currency,
//     cus_name,
//     cus_email,
//     cus_phone,
//     tran_id,
//     order_id,
//   } = req.body;

//   console.log("Payment initiation data received:", req.body);

//   const initiateData = {
//     store_id: config.SSLCOMMERZ_STORE_ID,
//     store_passwd: config.SSLCOMMERZ_STORE_PASSWD,
//     total_amount: amount,
//     currency,
//     success_url: "http://localhost:5001/api/payment/success",
//     fail_url: "http://localhost:5001/api/payment/fail",
//     cancel_url: "http://localhost:5001/api/payment/cancel",
//     cus_name,
//     cus_email,
//     cus_phone,
//     tran_id,
//     ship_name: cus_name,
//     cus_add1: "Dhaka",
//     cus_city: "Dhaka",
//     cus_state: "Dhaka",
//     cus_postcode: "1000",
//     cus_country: "Bangladesh",
//     ship_add1: "Dhaka",
//     ship_city: "Dhaka",
//     ship_state: "Dhaka",
//     ship_postcode: "1000",
//     ship_country: "Bangladesh",
//     multi_card_name: "mastercard,visacard,amexcard",
//     value_a: "ref001_A",
//     value_b: "ref002_B",
//     value_c: "ref003_C",
//     value_d: "ref004_D",
//   };

//   try {
//     console.log("Initiating payment with SSLCOMMERZ...");

//     const response = await axios({
//       method: "POST",
//       url: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
//       data: qs.stringify(initiateData),
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });

//     console.log("SSLCommerz response:", response.data);

//     // Check if GatewayPageURL is present
//     if (!response.data.GatewayPageURL) {
//       console.error("GatewayPageURL not found in response:", response.data);
//       return res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ message: "Failed to initiate payment" });
//     }

//     // Save initial payment data
//     const saveData = {
//       amount,
//       order_id,
//       cus_name,
//       cus_email,
//       cus_phone,
//       tran_id,
//       status: "pending",
//     };
//     const result = await Payment.create(saveData);
//     console.log("Payment data saved:", result);

//     // Send the GatewayPageURL to the client
//     res.json({ paymentUrl: response.data.GatewayPageURL });
//   } catch (error: any) {
//     console.error("Payment initiation error:", error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
//   }
// });

// Success payment
// router.post("/success", async (req, res) => {
//   const { tran_id, status } = req.body;
//   console.log("Payment success callback received:", req.body);

//   if (status !== "VALID") {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .send("Invalid unauthorized payment");
//   }

//   try {
//     const updatedPayment = await Payment.findOneAndUpdate(
//       { tran_id },
//       { status: "success" },
//       { new: true }
//     );

//     if (!updatedPayment) {
//       return res.status(StatusCodes.NOT_FOUND).send("Payment record not found.");
//     }

//     res.redirect("http://localhost:5173/payment-success");
//   } catch (error) {
//     console.error("Error updating payment status:", error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send("Error updating payment status");
//   }
// });

// Fail payment
// router.post("/fail", async (req, res) => {
//   console.log("Payment failure callback received:", req.body);
//   res.redirect("http://localhost:5173/payment-fail");
// });

// Cancel payment
// router.post("/cancel", async (req, res) => {
//   console.log("Payment cancellation callback received:", req.body);
//   res.redirect("http://localhost:5173/payment-cancel");
// });

export const PaymentRoutes = router;
