import { Schema } from "mongoose";

// Query Middleware
export const queryMiddlewareChecking = (
  modelSchema: Schema<unknown>,
  field: string,
  value: string | boolean
) => {
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
