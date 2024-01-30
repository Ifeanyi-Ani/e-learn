"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = __importDefault(require("./utils/db"));
app_1.app.listen(8009, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    (0, db_1.default)();
});
