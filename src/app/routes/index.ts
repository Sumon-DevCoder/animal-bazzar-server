import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { RoomRoutes } from "../module/room/room.route";
import { BookingRoutes } from "../module/booking/booking.route";
import { slotRoutes } from "../module/slot/slot.route";
import { PaymentRoutes } from "../module/payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/my-bookings",
    route: BookingRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
