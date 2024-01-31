"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.createActivationToken = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ejs_1 = __importDefault(require("ejs"));
require("dotenv").config();
const user_models_1 = __importDefault(require("../models/user.models"));
const CreateErr_1 = __importDefault(require("../utils/CreateErr"));
const catchAsync_1 = require("../middleware/catchAsync");
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const createActivationToken = (props) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        props,
        activationCode,
    }, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
exports.registerUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const emailExist = yield user_models_1.default.findOne({ email });
        if (emailExist) {
            return next(new CreateErr_1.default(400, "email already exist"));
        }
        const user = {
            name,
            email,
            password,
        };
        const activationToken = (0, exports.createActivationToken)(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        const html = ejs_1.default.renderFile(`${process.cwd()}/mails/activation-mail.ejs`, data);
        yield (0, sendMail_1.default)({
            email: user.email,
            subject: "Activate your account",
            templete: "activation-mail.ejs",
            data,
        });
        res.status(201).json({
            success: true,
            message: `Please check your email: ${user.email} to activate your account`,
            activationToken: activationToken.token,
        });
    }
    catch (err) {
        return next(new CreateErr_1.default(400, err.message));
    }
}));
