"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const payment_utils_1 = require("../payment/payment.utils");
const order_model_1 = require("./order.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, products } = orderData;
    const transactionId = `TXN-${Date.now()}`;
    const totalPrice = products.reduce((prev, current) => prev + current.price, 0);
    const order = new order_model_1.Order({
        user,
        totalPrice,
        status: "unconfirmed",
        paymentStatus: "Pending",
        transactionId,
    });
    yield order.save();
    const paymentData = {
        transactionId,
        totalPrice,
        custormerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
        customerAddress: user.address,
    };
    //payment
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    return paymentSession;
});
// get all
const getAllOrderFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // queryBuilder
    const orderQuery = new QueryBuilder_1.default(order_model_1.Order.find().populate("user"), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield orderQuery.countTotal();
    const result = yield orderQuery.modelQuery;
    // checking data
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "No Order Available!");
    }
    return {
        meta,
        result,
    };
});
// get all by user
const getAllOrderByUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // queryBuilder
    const result = yield order_model_1.Order.find({ "user.email": email });
    // checking data
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "No Order Available!");
    }
    return result;
});
// update
const updateOrderIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Order checking
    const result = yield order_model_1.Order.findByIdAndUpdate(_id, payload, {
        new: true,
    });
    console.log(result);
    return result;
});
const deleteOrderIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Order checking
    const OrderData = yield order_model_1.Order.findById({ _id });
    if (!OrderData) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Order not exists!");
    }
    const result = yield order_model_1.Order.findByIdAndDelete(_id, {
        new: true,
    });
    return result;
});
exports.orderService = {
    createOrder,
    getAllOrderFromDB,
    updateOrderIntoDB,
    deleteOrderIntoDB,
    getAllOrderByUserFromDB,
};
