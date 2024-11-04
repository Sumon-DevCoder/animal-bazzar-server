import mongoose, { Schema, Types } from "mongoose";
import { BookingStatus, TCart } from "./cart.interface";
import { queryMiddlewareChecking } from "../../utiils/queryMiddlewareChecking";

const CartSchema: Schema = new Schema<TCart>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User", //
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    isConfirmed: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.unconfirmed,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

queryMiddlewareChecking(CartSchema, "isDeleted", true);

const Cart = mongoose.model<TCart>("Cart", CartSchema);
export default Cart;
