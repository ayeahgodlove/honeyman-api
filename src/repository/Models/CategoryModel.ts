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
    type: DataType.NUMBER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

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
}
