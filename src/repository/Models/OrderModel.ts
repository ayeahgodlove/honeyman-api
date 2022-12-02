import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany,
  HasMany
} from "sequelize-typescript";
import { ProductModel } from "./ProductModel";
import { ProductOrderModel } from "./ProductOrderModel";
import { UserModel } from "./UserModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "Order",
})
export class OrderModel extends Model<OrderModel> {
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
      model: UserModel,
      key: "id",
    },
  })
  @ForeignKey(() => UserModel)
  userId!: string;

  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    references: {
      model: ProductModel,
      key: "id",
    },
  })
  @ForeignKey(() => ProductModel)
  productId!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  unitPrice!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total!: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    unique: true,
  })
  orderNo!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @HasMany(() => ProductModel)
  products!: ProductModel[]
}
