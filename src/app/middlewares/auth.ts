import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../error/AppError";
import catchAsync from "../utiils/catchAsync";
import { USER_ROLE, USER_STATUS } from "../module/user/user.constant";
import { User } from "../module/user/user.model";

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeaders = req.headers.authorization;

    const accessToken = authorizationHeaders?.split(" ")[1];

    if (!accessToken) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    const verfiedToken = jwt.verify(
      accessToken as string,
      config.jwt_access_secret as string
    );

    const { role, email } = verfiedToken as JwtPayload;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, "User not found");
    }

    if (user.status === USER_STATUS.blocked) {
      throw new AppError(401, "User is blocked");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    next();
  });
};
