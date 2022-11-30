import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { CategoryModel } from "./CategoryModel";
import { ProductModel } from "./ProductModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "SubCategory",
})
export class SubCategoryModel extends Model<SubCategoryModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: CategoryModel,
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
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  /**
   * Rav4 => Cars (belongs to)
   */
  @BelongsTo(() => CategoryModel)
  category!: CategoryModel;

  @HasMany(() => ProductModel)
  products!: ProductModel[];
}
