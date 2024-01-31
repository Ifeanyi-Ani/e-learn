"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    const status = err.status || "error";
    const message = err.message || "Something went wrong";
    res.status(err.statusCode).json({
        status,
        message,
        stack: err.stack,
        err,
    });
};
exports.errorHandler = errorHandler;
