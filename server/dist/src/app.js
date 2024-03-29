"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const CreateErr_1 = __importDefault(require("./utils/CreateErr"));
const errorHandler_1 = require("./middleware/errorHandler");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
require("dotenv").config();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json({ limit: "100mb" }));
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
// app.use(cors({
//     origin: process.env.ORIGIN
// }))
exports.app.use((0, cors_1.default)());
exports.app.use("/api/v1", user_routes_1.default);
exports.app.all("*", (req, _res, next) => {
    next(new CreateErr_1.default(404, `Route ${req.originalUrl} not found`));
});
exports.app.use(errorHandler_1.errorHandler);
