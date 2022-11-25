
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType
} from "sequelize-typescript";
import { CategoryModel } from "./CategoryModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "SubCategory",
})
export class SubCategoryModel extends Model<SubCategoryModel> {
  @Column({
    type: DataType.NUMBER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    references: {
      model: "Category",
      key: "id",
    },
  })
  @ForeignKey(() => CategoryModel)
  categoryId!: number;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;

  @BelongsTo(() => CategoryModel)
  category!: CategoryModel;
}