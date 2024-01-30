import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import CreateErr from "./utils/CreateErr";

require("dotenv").config();

export const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(cors({
//     origin: process.env.ORIGIN
// }))
app.use(cors());

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    hello: "worked",
  });
  next();
});
app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new CreateErr(404, `Route ${req.originalUrl} not found`));
});
app.use((err: CreateErr, _req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  const status = err.status;
  const message = err.message || "Something went wrong";

  res.status(err.statusCode).json({
    status,
    message,
  });
});
