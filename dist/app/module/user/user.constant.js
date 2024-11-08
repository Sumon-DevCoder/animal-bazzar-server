"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchableFields = exports.USER_STATUS = exports.USER_ROLE = void 0;
exports.USER_ROLE = {
    admin: "admin",
    user: "user",
};
exports.USER_STATUS = {
    active: "active",
    blocked: "blocked",
};
exports.userSearchableFields = ["name", "role", "email", "status"];
