import { Types } from "mongoose";

export enum BookingStatus {
  confirmed = "confirmed",
  unconfirmed = "unconfirmed",
  canceled = "canceled",
}

export type TCart = {
  product: Types.ObjectId;
  user: Types.ObjectId;
  totalAmount: number;
  isConfirmed: BookingStatus;
  isDeleted: boolean;
};
