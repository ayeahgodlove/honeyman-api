import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { ICategory } from "./ICategory";
import { ISubCategory } from "./ISubCategory";

export interface IProduct
  extends Model<InferAttributes<IProduct>, InferCreationAttributes<IProduct>> {
  id: number;
  name: string;
  price: string;
  description: string;
  categoryId: ForeignKey<ICategory['id']>;
  subCategoryId: ForeignKey<ISubCategory['id']>;
  imagePath: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}