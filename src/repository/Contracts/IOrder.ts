import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IOrder
  extends Model<InferAttributes<IOrder>, InferCreationAttributes<IOrder>> {
  id: number;
  userId: ForeignKey<IUser['id']>;
  productId: ForeignKey<IProduct['id']>;
  unitPrice: number;
  total: number;
  status: string;
  orderNo: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}
