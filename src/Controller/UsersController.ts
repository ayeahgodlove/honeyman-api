import { RequestHandler, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IUser, emptyUser, IUserResponse } from "../Domain/Entity/IUser";

import * as bcrypt from "bcrypt";
import slugify from "slugify";

const register: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IUserResponse>) => {
    const { password, username, email, address, fullname, role } = req.body;
    const slugVal = slugify(fullname.toLowerCase(), "-");

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
    };
  }
);

export { register };
