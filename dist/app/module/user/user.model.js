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
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// create user schema
const UserSchema = new mongoose_1.Schema({
    name: {
        type: "String",
        required: [true, "name is required"],
        trim: true,
    },
    email: {
        type: "String",
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: "String",
        required: [true, "password is required"],
        select: 0,
    },
    status: {
        type: "String",
        required: [true, "status is required"],
        enum: Object.values(user_constant_1.USER_STATUS),
        default: user_constant_1.USER_STATUS.active,
    },
    role: {
        type: "String",
        required: [true, "role is required"],
        enum: Object.values(user_constant_1.USER_ROLE),
    },
    img: {
        type: "String",
        required: [true, "img is required"],
    },
    phone: {
        type: "String",
        required: [true, "phone number is required"],
        unique: true,
    },
    address: {
        type: "String",
        required: [true, "Address is required"],
    },
}, { timestamps: true });
// setup password hashing
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
UserSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = "";
        next();
    });
});
// create and export model schema
exports.User = (0, mongoose_1.model)("User", UserSchema);
