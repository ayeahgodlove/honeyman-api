import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType
} from "sequelize-typescript";
import { CategoryModel } from "./CategoryModel";
import { SubCategoryModel } from "./SubCategoryModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "Product",
})
export class ProductModel extends Model<ProductModel> {
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
    type: DataType.NUMBER,
    allowNull: false,
    references: {
      model: "SubCategory",
      key: "id",
    },
  })
  @ForeignKey(() => SubCategoryModel)
  subCategoryId!: number;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  description!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  imagePath!: string;

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

  @BelongsTo(() => SubCategoryModel)
  subCategory!: SubCategoryModel;
}