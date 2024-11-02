/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.utils";
import jwt from "jsonwebtoken";
import config from "../../config";

// register
const register = async (payload: TUser): Promise<any> => {
  // user checking
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(StatusCodes.CONFLICT, "Already registered");
  }

  // create user
  const newUser = await User.create(payload);
  return newUser;
};

// login
const login = async (payload: TLoginUser) => {
  // checking user
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new Error(
      "Email Address is not registered. Please check and try again"
    );
  }

  // checking user status
  if (user.status === "blocked") {
    throw new Error("User is Blocked");
  }

  // checking isMatchPassword
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched!");
  }

  // return user information using jwt
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  const { password, status, ...userInfo } = user.toObject();

  return {
    accessToken,
    refreshToken,
    userInfo,
  };
};

export const AuthServices = {
  register,
  login,
};
