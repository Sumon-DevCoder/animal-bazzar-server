import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  totalPrice: number;
  status: string;
  paymentStatus: string;
  transactionId: string;
}

const OrderSchema: Schema = new Schema(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["unconfirmed", "confirmed"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
