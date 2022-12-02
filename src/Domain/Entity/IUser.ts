import { IBaseResponse } from "./BaseResponse";

export interface IUser {
  id: string;
  username: string;
  slug: string;
  fullname: string;
  email: string;
  password: string;
  address: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const emptyUser: IUser = {
  id: "",
  username: "",
  slug: "",
  fullname: "",
  email: "",
  password: "",
  address: "",
  role: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface IUserResponse extends IBaseResponse {
  data: IUser | null;
  token?: string
}
