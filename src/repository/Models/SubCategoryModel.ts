
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

  @BelongsTo(() => CategoryModel)
  category!: CategoryModel;
}