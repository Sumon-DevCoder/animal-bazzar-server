"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMiddlewareChecking = void 0;
// Query Middleware
const queryMiddlewareChecking = (modelSchema, field, value) => {
    modelSchema.pre("find", function (next) {
        this.find({ [field]: { $ne: value } });
        next();
    });
    modelSchema.pre("findOne", function (next) {
        this.find({ [field]: { $ne: value } });
        next();
    });
    modelSchema.pre("aggregate", function (next) {
        this.pipeline().unshift({ $match: { [field]: { $ne: value } } });
        next();
    });
    return;
};
exports.queryMiddlewareChecking = queryMiddlewareChecking;
