import { sequelize } from "../../Config/connection";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { Order } from "./Order";
import { Product } from "./Product";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "ProductOrders",
  modelName: "ProductOrder"
})
export class ProductOrder extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  })
  @ForeignKey(() => Product)
  productId!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    references: {
      model: Order,
      key: "id",
    },
  })
  @ForeignKey(() => Order)
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
  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => Order)
  order!: Order;
}
// export const productOrderRepository = sequelize.getRepository(ProductOrder);