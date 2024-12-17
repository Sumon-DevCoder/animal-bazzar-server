import mongoose, { Schema } from "mongoose";
import { queryMiddlewareChecking } from "../../utiils/queryMiddlewareChecking";
import { TProduct } from "./product.interface";

const ProductSchema: Schema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    img: { type: [String], required: true },
    age: {
      value: { type: Number, required: true },
      unit: {
        type: String,
        enum: ["day", "week", "month", "year"],
        required: true,
      },
    },
    like: { type: Number, default: 0 },
    color: { type: String, required: true },
    size: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ["kg", "gm"], required: true },
    },
  },
  { timestamps: true }
);

queryMiddlewareChecking(ProductSchema, "isDeleted", true);

export const Product = mongoose.model<TProduct>("Product", ProductSchema);
