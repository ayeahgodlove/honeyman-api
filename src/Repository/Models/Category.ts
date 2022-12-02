import { sequelize } from "../../Config/connection";
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Product } from "./Product";
import { SubCategory } from "./SubCategory";
import { uuid } from "uuidv4";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Categories",
  modelName: "Category"
})
export class Category extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

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
  @HasMany(() => SubCategory)
  subCategories!: SubCategory[];

  @HasMany(() => Product)
  products!: Product[];
}

// export const categoryRepository = sequelize.getRepository(Category);