import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface IUser
  extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
  address: string;
  role: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}
