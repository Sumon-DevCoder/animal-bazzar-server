import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { TRoom } from "./room.interface";
import { Room } from "./product.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { roomSearchableFields } from "./product.constant";

// create
const createRoomIntoDB = async (payload: TRoom) => {
  // room checking
  const isRoomExists = await Room.findOne({
    roomNo: payload.roomNo,
  });

  if (isRoomExists) {
    throw new AppError(StatusCodes.CONFLICT, "Room already exists");
  }

  const result = await Room.create(payload);
  return result;
};

// get all
const getAllRoomFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const roomQuery = new QueryBuilder(Room.find(), query)
    .search(roomSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await roomQuery.countTotal();
  const result = await roomQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "rooms not found!");
  }

  return {
    meta,
    result,
  };
};

// get single
const getSingleRoomFromDB = async (_id: string) => {
  const result = await Room.findById({ _id });

  // checking data
  if (result === null) {
    throw new AppError(StatusCodes.NOT_FOUND, "rooms not found!");
  }

  return result;
};

// update
const updateRoomIntoDB = async (_id: string, payload: Partial<TRoom>) => {
  // room checking
  const isRoomExists = await Room.findById({ _id });
  if (!isRoomExists) {
    throw new AppError(StatusCodes.CONFLICT, "Room not found!");
  }

  const result = await Room.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

// update
const deleteRoomIntoDB = async (_id: string) => {
  // room checking
  const room = await Room.findById({ _id });
  if (!room) {
    throw new AppError(StatusCodes.CONFLICT, "Room not found!");
  }

  const result = await Room.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomFromDB,
  updateRoomIntoDB,
  deleteRoomIntoDB,
};
