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
exports.ProductServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../error/AppError"));
const product_model_1 = require("./product.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constant_1 = require("./product.constant");
// create
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Product checking
    const isProductExists = yield product_model_1.Product.findOne({
        name: payload.name,
    });
    if (isProductExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Product already exists");
    }
    const result = yield product_model_1.Product.create(payload);
    return result;
});
// get all
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // queryBuilder
    const ProductQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield ProductQuery.countTotal();
    const result = yield ProductQuery.modelQuery;
    // checking data
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Products not Exist!");
    }
    return {
        meta,
        result,
    };
});
// get single
const getSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById({ _id });
    // checking data
    if (result === null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Products not exist!");
    }
    return result;
});
// update
const updateProductIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Product checking
    const isProductExists = yield product_model_1.Product.findById({ _id });
    if (!isProductExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Product not exists!");
    }
    const result = yield product_model_1.Product.findByIdAndUpdate({ _id }, payload, {
        new: true,
    });
    return result;
});
// update
const deleteProductIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Product checking
    const ProductData = yield product_model_1.Product.findById({ _id });
    if (!ProductData) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Product not exists!");
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(_id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getSingleProductFromDB,
    getAllProductFromDB,
    updateProductIntoDB,
    deleteProductIntoDB,
};
