"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.CartStatus = void 0;
var CartStatus;
(function (CartStatus) {
    CartStatus["confirmed"] = "confirmed";
    CartStatus["unconfirmed"] = "unconfirmed";
    CartStatus["canceled"] = "canceled";
})(CartStatus || (exports.CartStatus = CartStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Paid"] = "paid";
    PaymentStatus["unpaid"] = "unpaid";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
