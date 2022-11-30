import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface ICategory
  extends Model<
    InferAttributes<ICategory>,
    InferCreationAttributes<ICategory>
  > {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}
