"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateErr extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }
}
exports.default = CreateErr;
