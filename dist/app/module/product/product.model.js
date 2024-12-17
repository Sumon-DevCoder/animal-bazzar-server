"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const queryMiddlewareChecking_1 = require("../../utiils/queryMiddlewareChecking");
const ProductSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
(0, queryMiddlewareChecking_1.queryMiddlewareChecking)(ProductSchema, "isDeleted", true);
exports.Product = mongoose_1.default.model("Product", ProductSchema);
