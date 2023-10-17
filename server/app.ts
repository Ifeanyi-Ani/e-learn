import express, { NextFunction, Response, Request } from "express";
require('dotenv').config();
export const app= express();
import cors from "cors";
import cookieParser from 'cookie-parser';

app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
// app.use(cors({
//     origin: process.env.ORIGIN
// }))
app.use(cors());


app.all("*", (req:Request,res:Response,next:NextFunction)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode=404;
    next(err);
})