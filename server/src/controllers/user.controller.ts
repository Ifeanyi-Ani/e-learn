import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

import userModel, { IUser } from "../models/user.models";
import CreateErr from "../utils/CreateErr";
import { catchAsync } from "../middleware/catchAsync";

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface ICreateActivation {
  token: string;
  activationToken: string;
}

export const createActivationToken = (props: IUser): ICreateActivation => {
  const activationToken = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      props,
      activationToken,
    },
    process.env.ACTIVATION_SECRET!,
    { expiresIn: "5m" },
  );

  return { token, activationToken };
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
    } catch (err: any) {
      return next(new CreateErr(400, err.message));
    }
  },
);
