import {
  Table,
  Model,
  Column,
  DataType
} from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "Category"
})
export class CategoryModel extends Model<CategoryModel> {

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true
  })
  name!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true
  })
  slug!: string;
}
