import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { ICategory } from "./ICategory";

export interface ISubCategory
  extends Model<
    InferAttributes<ISubCategory>,
    InferCreationAttributes<ISubCategory>
  > {
  id: number;
  name: string;
  slug: string;
  categoryId: ForeignKey<ICategory['id']>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}
