"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const order_model_1 = require("./../order/order.model");
const path_1 = require("path");
const payment_utils_1 = require("./payment.utils");
const fs_1 = require("fs");
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    console.log("verifyResponse", verifyResponse);
    let result;
    let message = "";
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        result = yield order_model_1.Order.findOneAndUpdate({ transactionId }, {
            paymentStatus: "Paid",
        });
        console.log("update result", result);
        message = "Successfully Paid!";
        return `<div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f8f8f8;">
        <h2 style="color: #4CAF50; font-size: 36px;">Payment Successful!</h2>
        <p style="font-size: 18px; color: #333;">Your payment has been successfully processed. Thank you for your purchase!</p>
        
        <!-- Stylish Success Button -->
        <button style="padding: 15px 30px; font-size: 18px; color: white; background-color: #4CAF50; border: none; cursor: pointer; border-radius: 5px; transition: background-color 0.3s ease;">
          <a href="http://localhost:3000/dashboard/order-history" style="text-decoration: none; color: white;">Go Order Details</a>
        </button>
        
        <p style="margin-top: 20px; font-size: 16px; color: #777;">If you're not redirected automatically, click the button above.</p>
      </div>`;
    }
    else {
        message = "Payment Failed!";
    }
    const filePath = (0, path_1.join)(__dirname, "../../../views/confirmation.html");
    let template = (0, fs_1.readFileSync)(filePath, "utf-8");
    template = template.replace("{{message}}", message);
    return template;
});
exports.paymentServices = {
    confirmationService,
};
