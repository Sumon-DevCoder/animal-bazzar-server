export type TProduct = {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  isDeleted: boolean;
  img: string[];
  age: {
    value: number;
    unit: "day" | "week" | "month" | "year";
  };
  like: number;
  color: string;
  size: {
    value: number;
    unit: "kg" | "gm";
  };
};
