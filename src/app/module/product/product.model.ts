import mongoose, { Schema } from "mongoose";
import { queryMiddlewareChecking } from "../../utiils/queryMiddlewareChecking";
import { TProduct } from "./product.interface";

const ProductSchema: Schema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

queryMiddlewareChecking(ProductSchema, "isDeleted", true);

export const Product = mongoose.model<TProduct>("Product", ProductSchema);
