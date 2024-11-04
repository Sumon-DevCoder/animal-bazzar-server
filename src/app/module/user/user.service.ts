import { StatusCodes } from "http-status-codes";
import { TUser } from "./user.interface";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import { User } from "./user.model";

// get all
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "data not found!");
  }

  return {
    meta,
    result,
  };
};

// update
const updateUserIntoDB = async (_id: string, payload: Partial<TUser>) => {
  // user checking
  const isUserExists = await User.findOne({ _id });
  if (!isUserExists) {
    throw new AppError(StatusCodes.CONFLICT, "User not found!");
  }

  const result = await User.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  console.log(result);

  return result;
};

const deleteUserIntoDB = async (_id: string) => {
  // User checking
  const UserData = await User.findById({ _id });
  if (!UserData) {
    throw new AppError(StatusCodes.CONFLICT, "User not exists!");
  }

  const result = await User.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const UserServices = {
  updateUserIntoDB,
  getAllUsersFromDB,
  deleteUserIntoDB,
};
