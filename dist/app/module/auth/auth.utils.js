"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordMatched = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const isPasswordMatched = (plainPassword, hashedPassword) => {
    const isMatched = bcrypt_1.default.compare(plainPassword, hashedPassword);
    return isMatched;
};
exports.isPasswordMatched = isPasswordMatched;
