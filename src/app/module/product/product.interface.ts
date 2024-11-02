export type TRoom = {
  name: string; // The name of the meeting room
  roomNo: number; // The unique number of the room
  floorNo: number; // The level of the meeting room
  capacity: number; // Maximum number of people the room can accommodate
  pricePerSlot: number; // Cost of a single slot
  amenities: string[]; // Array of available amenities (e.g., ["Projector", "Whiteboard"])
  isDeleted: boolean; // Boolean to indicate whether the room is deleted
  img: string[];
};
