import { USER_ROLE, USER_STATUS } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  role: keyof typeof USER_ROLE;
  phone: string;
  address: string;
  img: string;
};
