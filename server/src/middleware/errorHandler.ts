import { NextFunction, Request, Response } from "express";
import CreateErr from "../utils/CreateErr";

export const errorHandler = (
  err: CreateErr,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
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
