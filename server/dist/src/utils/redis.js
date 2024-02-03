"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
require("dotenv").config();
const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log("Redis Connected");
        return process.env.REDIS_URL;
    }
    else {
        throw new Error("Redis connection failed");
    }
};
console.log("you");
exports.redis = new ioredis_1.Redis(redisClient());
