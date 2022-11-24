import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { IUser } from "./IUser";

export interface IPayment
  extends Model<InferAttributes<IPayment>, InferCreationAttributes<IPayment>> {
  id: string;
  userId: ForeignKey<IUser['id']>;
  orderNo: string;
  amount: number;
  status: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}
