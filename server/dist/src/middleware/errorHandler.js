"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CreateErr_1 = __importDefault(require("../utils/CreateErr"));
const errorHandler = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong";
    if (err.name === "CastError") {
        const message = `Resource not found Invalid: ${err.path}`;
        err = new CreateErr_1.default(400, message);
    }
    // Duplicate key
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new CreateErr_1.default(400, message);
    }
    if (err.name === "JsonWebTokenError") {
        const message = "Json web token is invalid, try again";
        err = new CreateErr_1.default(400, message);
    }
    if (err.name === "TokenExpiredError") {
        const message = "Json web token is expired, try again";
        err = new CreateErr_1.default(400, message);
    }
    res.status(err.statusCode).json({ status: err.status, message: err.message });
};
exports.errorHandler = errorHandler;
