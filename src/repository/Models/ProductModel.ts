import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { CategoryModel } from "./CategoryModel";
import { OrderModel } from "./OrderModel";
import { ProductOrderModel } from "./ProductOrderModel";
import { SubCategoryModel } from "./SubCategoryModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "Product",
})
export class ProductModel extends Model<ProductModel> {
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
      model: CategoryModel,
      key: "id",
    },
  })
  @ForeignKey(() => CategoryModel)
  categoryId!: string;

  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    references: {
      model: SubCategoryModel,
      key: "id",
    },
  })
  @ForeignKey(() => SubCategoryModel)
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

  @BelongsTo(() => CategoryModel)
  category!: CategoryModel;

  @BelongsTo(() => SubCategoryModel)
  subCategory!: SubCategoryModel;

  @BelongsToMany(() => OrderModel, () => ProductOrderModel)
  orders!: OrderModel[];
}
