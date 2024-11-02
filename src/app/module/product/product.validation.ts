import { z } from "zod";

export const createRoomSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Room Name is Required"),
    roomNo: z.number({
      required_error: "Room Number is Required",
    }),
    floorNo: z.number({
      required_error: "Floor Number is Required",
    }),
    capacity: z
      .number({
        required_error: "Capacity is Required",
      })
      .min(1, "Capacity must be at least 1"),
    pricePerSlot: z
      .number({
        required_error: "Price per slot is required",
      })
      .min(0, "Price per slot cannot be negative"),
    amenities: z.array(z.string()).min(1, "At least one amenity is required"),
    isDeleted: z.boolean().optional(),
    img: z.array(z.string()).min(3, "At least 3 img is required"),
  }),
});

export const updateRoomSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Room Name is Required").optional(),
    roomNo: z
      .number({
        required_error: "Room Number is Required",
      })
      .optional(),
    floorNo: z
      .number({
        required_error: "Floor Number is Required",
      })
      .optional(),
    capacity: z
      .number({
        required_error: "Capacity is Required",
      })
      .min(1, "Capacity must be at least 1")
      .optional(),
    pricePerSlot: z
      .number({
        required_error: "Price per slot is required",
      })
      .min(0, "Price per slot cannot be negative")
      .optional(),
    amenities: z
      .array(z.string())
      .min(1, "At least one amenity is required")
      .optional(),
    isDeleted: z.boolean().optional(),
    img: z.array(z.string()).min(3, "At least 3 img is required").optional(),
  }),
});

export const roomSchemaValidation = {
  createRoomSchemaValidation,
  updateRoomSchemaValidation,
};
