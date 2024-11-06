import { Order } from "./../order/order.model";
import { join } from "path";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  console.log("verifyResponse", verifyResponse);

  let result;
  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await Order.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
      }
    );

    console.log("update result", result);

    message = "Successfully Paid!";

    return `<div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f8f8f8;">
        <h2 style="color: #4CAF50; font-size: 36px;">Payment Successful!</h2>
        <p style="font-size: 18px; color: #333;">Your payment has been successfully processed. Thank you for your purchase!</p>
        
        <!-- Stylish Success Button -->
        <button style="padding: 15px 30px; font-size: 18px; color: white; background-color: #4CAF50; border: none; cursor: pointer; border-radius: 5px; transition: background-color 0.3s ease;">
          <a href="http://localhost:3000/cart" style="text-decoration: none; color: white;">Go to Cart</a>
        </button>
        
        <p style="margin-top: 20px; font-size: 16px; color: #777;">If you're not redirected automatically, click the button above.</p>
      </div>`;
  } else {
    message = "Payment Failed!";
  }

  const filePath = join(__dirname, "../../../views/confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  template = template.replace("{{message}}", message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
