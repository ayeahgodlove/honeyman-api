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
    type: DataType.UUIDV4,
    allowNull: false,
    references: {
      model: OrderModel,
      key: "id",
    },
  })
  @ForeignKey(() => OrderModel)
  orderId!: string;

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
