import mongoose, { Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const PaymentSchema = new Schema<TPayment>(
  {
    amount: {
      type: Number,
    },
    currency: {
      type: String,
      required: true,
      default: "BDT",
    },
    order_id: {
      type: String,
      required: true,
      //   ref: "Order Id",
    },
    tran_id: { type: String, required: true },

    cus_name: {
      type: String,
      required: true,
    },
    cus_email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    cus_phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Payment model
const Payment = mongoose.model<TPayment>("Payment", PaymentSchema);
export default Payment;
