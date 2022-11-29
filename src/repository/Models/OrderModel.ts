import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType
} from "sequelize-typescript";
import { ProductModel } from "./ProductModel";
import { UserModel } from "./UserModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "Order",
})
export class OrderModel extends Model<OrderModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  })
  @ForeignKey(() => UserModel)
  userId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: ProductModel,
      key: "id",
    },
  })
  @ForeignKey(() => ProductModel)
  productId!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  unitPrice!: number;

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

  @BelongsTo(() => ProductModel)
  product!: ProductModel;
}