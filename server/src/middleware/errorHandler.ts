import { NextFunction, Request, Response } from "express";
import CreateErr from "../utils/CreateErr";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  if (err.name === "CastError") {
    const message = `Resource not found Invalid: ${err.path}`;
    err = new CreateErr(400, message);
  }

  // Duplicate key
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new CreateErr(400, message);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid, try again";
    err = new CreateErr(400, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Json web token is expired, try again";
    err = new CreateErr(400, message);
  }
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};
