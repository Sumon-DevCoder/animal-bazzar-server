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
exports.UserServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../error/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
// get all
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // queryBuilder
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(user_constant_1.userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    // checking data
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "data not found!");
    }
    return {
        meta,
        result,
    };
});
// get user by email
const getUserByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email });
    return result;
});
// update
const updateUserIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // user checking
    const isUserExists = yield user_model_1.User.findOne({ _id });
    if (!isUserExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "User not found!");
    }
    const result = yield user_model_1.User.findByIdAndUpdate(_id, payload, {
        new: true,
    });
    console.log(result);
    return result;
});
const deleteUserIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    // User checking
    const UserData = yield user_model_1.User.findById({ _id });
    if (!UserData) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "User not exists!");
    }
    const result = yield user_model_1.User.findByIdAndDelete(_id, {
        new: true,
    });
    return result;
});
exports.UserServices = {
    updateUserIntoDB,
    getAllUsersFromDB,
    deleteUserIntoDB,
    getUserByEmailFromDB,
};
