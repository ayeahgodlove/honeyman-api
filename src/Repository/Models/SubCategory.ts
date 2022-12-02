import { sequelize } from "../../Config/connection";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { Category } from "./Category";
import { Product } from "./Product";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "SubCategories",
})
export class SubCategory extends Model {
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
  @BelongsTo(() => Category)
  category!: Category;

  @HasMany(() => Product)
  products!: Product[];
}

export const subCategoryRepository = sequelize.getRepository(SubCategory);