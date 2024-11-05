import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TCart } from "./cart.interface";
import Cart from "./cart.model";
import { CartSearchableFields } from "./cart.constant";

// create
const createCartIntoDB = async (payload: TCart) => {
  // Cart checking
  const isCartExists = await Cart.findOne({
    product: payload.product,
  });

  if (isCartExists) {
    throw new AppError(StatusCodes.CONFLICT, "Cart already exists");
  }

  const result = await Cart.create(payload);
  return result;
};

// get all
const getAllCartFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const CartQuery = new QueryBuilder(Cart.find().populate("product"), query)
    .search(CartSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await CartQuery.countTotal();
  const result = await CartQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Carts not Exist!");
  }

  return {
    meta,
    result,
  };
};

// get single
const getSingleCartFromDB = async (_id: string) => {
  const result = await Cart.findById({ _id });

  // checking data
  if (result === null) {
    throw new AppError(StatusCodes.NOT_FOUND, "Carts not exist!");
  }

  return result;
};

// get single
const getSingleCartByUserFromDB = async (email: string) => {
  const result = await Cart.find({ user: email });

  // checking data
  if (result === null) {
    throw new AppError(StatusCodes.NOT_FOUND, "Carts not exist!");
  }

  return result;
};

// update
const updateCartIntoDB = async (_id: string, payload: Partial<TCart>) => {
  // Cart checking
  const isCartExists = await Cart.findById({ _id });
  if (!isCartExists) {
    throw new AppError(StatusCodes.CONFLICT, "Cart not exists!");
  }

  const result = await Cart.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

// update
const deleteCartIntoDB = async (_id: string) => {
  // Cart checking
  const CartData = await Cart.findById({ _id });
  if (!CartData) {
    throw new AppError(StatusCodes.CONFLICT, "Cart not exists!");
  }

  const result = await Cart.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const CartServices = {
  createCartIntoDB,
  getSingleCartFromDB,
  getAllCartFromDB,
  updateCartIntoDB,
  deleteCartIntoDB,
  getSingleCartByUserFromDB,
};
