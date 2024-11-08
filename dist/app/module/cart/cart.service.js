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
exports.CartServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../error/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const cart_model_1 = __importDefault(require("./cart.model"));
const cart_constant_1 = require("./cart.constant");
// create
const createCartIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Cart checking
    const isCartExists = yield cart_model_1.default.findOne({
        product: payload.product,
        email: payload.user,
    });
    if (isCartExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Cart already exists");
    }
    const result = yield cart_model_1.default.create(payload);
    return result;
});
// get all
const getAllCartFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // queryBuilder
    const CartQuery = new QueryBuilder_1.default(cart_model_1.default.find().populate("product"), query)
        .search(cart_constant_1.CartSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield CartQuery.countTotal();
    const result = yield CartQuery.modelQuery;
    // checking data
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Carts not Exist!");
    }
    return {
        meta,
        result,
    };
});
// get single
const getSingleCartFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.default.findById({ _id });
    // checking data
    if (result === null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Carts not exist!");
    }
    return result;
});
const getCartByUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // Using `find` to fetch all carts for the user
    console.log(email);
    const result = yield cart_model_1.default.find({ user: email });
    console.log(result);
    // Check if the result is an empty array
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "No carts found for this user!");
    }
    return result;
});
// update
const updateCartIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Cart checking
    const isCartExists = yield cart_model_1.default.findById({ _id });
    if (!isCartExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Cart not exists!");
    }
    const result = yield cart_model_1.default.findByIdAndUpdate({ _id }, payload, {
        new: true,
    });
    return result;
});
// update
const deleteCartIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Cart checking
    const CartData = yield cart_model_1.default.findById({ _id });
    if (!CartData) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Cart not exists!");
    }
    const result = yield cart_model_1.default.findByIdAndUpdate(_id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.CartServices = {
    createCartIntoDB,
    getSingleCartFromDB,
    getAllCartFromDB,
    updateCartIntoDB,
    deleteCartIntoDB,
    getCartByUserFromDB,
};
