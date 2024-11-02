import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { Product } from "./product.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { TProduct } from "./product.interface";
import { ProductSearchableFields } from "./product.constant";

// create
const createProductIntoDB = async (payload: TProduct) => {
  // Product checking
  const isProductExists = await Product.findOne({
    name: payload.name,
  });

  if (isProductExists) {
    throw new AppError(StatusCodes.CONFLICT, "Product already exists");
  }

  const result = await Product.create(payload);
  return result;
};

// get all
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const ProductQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ProductQuery.countTotal();
  const result = await ProductQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Products not Exist!");
  }

  return {
    meta,
    result,
  };
};

// get single
const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findById({ _id });

  // checking data
  if (result === null) {
    throw new AppError(StatusCodes.NOT_FOUND, "Products not exist!");
  }

  return result;
};

// update
const updateProductIntoDB = async (_id: string, payload: Partial<TProduct>) => {
  // Product checking
  const isProductExists = await Product.findById({ _id });
  if (!isProductExists) {
    throw new AppError(StatusCodes.CONFLICT, "Product not exists!");
  }

  const result = await Product.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

// update
const deleteProductIntoDB = async (_id: string) => {
  // Product checking
  const ProductData = await Product.findById({ _id });
  if (!ProductData) {
    throw new AppError(StatusCodes.CONFLICT, "Product not exists!");
  }

  const result = await Product.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getSingleProductFromDB,
  getAllProductFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
