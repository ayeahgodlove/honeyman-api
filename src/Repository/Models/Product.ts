import { sequelize } from "../../Config/connection";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { Category } from "./Category";
import { Order } from "./Order";
import { ProductOrder } from "./ProductOrder";
import { SubCategory } from "./SubCategory";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Products",
})
export class Product extends Model {
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
  })
  @ForeignKey(() => Category)
  categoryId!: string;

  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    references: {
      model: SubCategory,
      key: "id",
    },
  })
  @ForeignKey(() => SubCategory)
  subCategoryId!: string;

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

  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => SubCategory)
  subCategory!: SubCategory;

  @BelongsToMany(() => Order, () => ProductOrder)
  orders!: Order[];
}

export const productRepository = sequelize.getRepository(Product);