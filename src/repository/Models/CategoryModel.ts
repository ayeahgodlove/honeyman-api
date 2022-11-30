import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { ProductModel } from "./ProductModel";
import { SubCategoryModel } from "./SubCategoryModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "Category",
})
export class CategoryModel extends Model<CategoryModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id?: number;

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
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  // category can have one-or-many subcategories
  /**
   *  category: Car
   * subCategory: Suff, Rav4, Land Cruiser etc...
   */
  @HasMany(() => SubCategoryModel)
  subCategories!: SubCategoryModel[];

  @HasMany(() => ProductModel)
  products!: ProductModel[];
}