"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const product_route_1 = require("../module/product/product.route");
const cart_route_1 = require("../module/cart/cart.route");
const order_routes_1 = require("../module/order/order.routes");
const payment_route_1 = require("../module/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/carts",
        route: cart_route_1.CartRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.OrderRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
