import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import CreateErr from "./utils/CreateErr";
import { errorHandler } from "./middleware/errorHandler";
import userRouter from "./routes/user.routes";

require("dotenv").config();

export const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(cors({
//     origin: process.env.ORIGIN
// }))
app.use(cors());

app.use("/api/v1", userRouter);
app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new CreateErr(404, `Route ${req.originalUrl} not found`));
});
app.use(errorHandler);
