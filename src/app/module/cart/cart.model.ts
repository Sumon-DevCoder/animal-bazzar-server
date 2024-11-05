import mongoose, { Schema, Types } from "mongoose";
import { CartStatus, PaymentStatus, TCart } from "./cart.interface";
import { queryMiddlewareChecking } from "../../utiils/queryMiddlewareChecking";
import { string } from "zod";

const CartSchema: Schema = new Schema<TCart>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    user: {
      type: String,
      required: true,
      ref: "User", //
    },

    price: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: String,
      enum: Object.values(CartStatus),
      default: CartStatus.unconfirmed,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.unpaid,
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
