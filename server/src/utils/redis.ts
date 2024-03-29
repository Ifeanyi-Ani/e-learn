import { Redis } from "ioredis";

require("dotenv").config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis Connected");
    return process.env.REDIS_URL;
  } else {
    throw new Error("Redis connection failed");
  }
};

console.log("you");

export const redis = new Redis(redisClient());
