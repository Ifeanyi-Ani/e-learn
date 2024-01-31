import { Response, Request, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";

require("dotenv").config();

import userModel, { IUser } from "../models/user.models";
import CreateErr from "../utils/CreateErr";
import { catchAsync } from "../middleware/catchAsync";
import path from "path";

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface ICreateActivation {
  token: string;
  activationCode: string;
}

export const createActivationToken = (
  props: IRegistrationBody,
): ICreateActivation => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      props,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" },
  );

  return { token, activationCode };
};

export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const emailExist = await userModel.findOne({ email });

      if (emailExist) {
        return next(new CreateErr(400, "email already exist"));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;
      const data: any = { user: { name: user.name }, activationCode };

      const html = ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs", data),
      );
    } catch (err: any) {
      return next(new CreateErr(400, err.message));
    }
  },
);
