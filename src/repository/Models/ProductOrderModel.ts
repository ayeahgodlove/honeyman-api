import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { OrderModel } from "./OrderModel";
import { ProductModel } from "./ProductModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "ProductOrder",
})
export class ProductOrderModel extends Model<ProductOrderModel> {
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
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: OrderModel,
      key: "id",
    },
  })
  @ForeignKey(() => OrderModel)
  orderId!: number;

  //   additional
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

  //   relationships
  @BelongsTo(() => ProductModel)
  product!: ProductModel;

  @BelongsTo(() => OrderModel)
  order!: OrderModel;
}
