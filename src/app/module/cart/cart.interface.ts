import { Types } from "mongoose";

export enum CartStatus {
  confirmed = "confirmed",
  unconfirmed = "unconfirmed",
  canceled = "canceled",
}

export enum PaymentStatus {
  Paid = "paid",
  unpaid = "unpaid",
}

export type TCart = {
  product: Types.ObjectId;
  productName: string;
  user: string;
  paymentStatus: PaymentStatus;
  price: number;
  isConfirmed: CartStatus;
  isDeleted: boolean;
};
