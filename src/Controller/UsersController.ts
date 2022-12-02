import { RequestHandler, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IUser, emptyUser, IUserResponse } from "../Domain/Entity/IUser";
import { uuid } from "uuidv4";
import * as bcrypt from "bcrypt";
import slugify from "slugify";
import { User } from "../Repository/Models/User";

const register: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IUserResponse>) => {
    const { password, username, email, address, fullname, role } = req.body;
    const slugVal = slugify(fullname.toLowerCase(), "-");

    // check if the required fields have been entered
    if (!username || !email || !password) {
      res.status(400).send({
        validationErrors: [
          "Please add a firstname field",
          "Please add a password field",
          "Please add a email field",
        ],
        message: "Failed validations",
        success: false,
        data: null,
      });
    }

    console.log("Hello world...", req.body);

    // check if username, or email exist already
    const userExists = await User.findOne<User>({
      where: { email, username },
    });
    if (userExists) {
      res.status(400).send({
        message: "User already exists!",
        validationErrors: ["Email already exists!", "Username already exists!"],
        success: false,
        data: null,
      });
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser: IUser = {
        ...emptyUser,
        username,
        email,
        password: hashPassword,
        address,
        fullname,
        role,
        slug: slugVal,
        id: uuid(),
      };

      const user = await User.create<User>(newUser as any);
      res.status(201).json({
        data: user as any,
        message: "User Registered Successfully!",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: "User Registeration Failed!",
        validationErrors: [...error],
        success: true,
      });
    }
  }
);

export { register };
