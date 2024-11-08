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
const mongoose_1 = __importStar(require("mongoose"));
const cart_interface_1 = require("./cart.interface");
const queryMiddlewareChecking_1 = require("../../utiils/queryMiddlewareChecking");
const CartSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(cart_interface_1.CartStatus),
        default: cart_interface_1.CartStatus.unconfirmed,
    },
    paymentStatus: {
        type: String,
        enum: Object.values(cart_interface_1.PaymentStatus),
        default: cart_interface_1.PaymentStatus.unpaid,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
(0, queryMiddlewareChecking_1.queryMiddlewareChecking)(CartSchema, "isDeleted", true);
const Cart = mongoose_1.default.model("Cart", CartSchema);
exports.default = Cart;
