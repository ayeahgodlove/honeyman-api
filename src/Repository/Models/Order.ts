import { sequelize } from "../../Config/connection";
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
import { Product } from "./Product";
import { ProductOrder } from "./ProductOrder";
import { User } from "./User";
import { uuid } from "uuidv4";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Orders",
  modelName: "Order"
})
export class Order extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  })
  @ForeignKey(() => User)
  userId!: string;

  // @Column({
  //   type: DataType.STRING(50),
  //   allowNull: false,
  //   references: {
  //     model: Product,
  //     key: "id",
  //   },
  // })
  // @ForeignKey(() => Product)
  // productId!: string;

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

  @BelongsTo(() => User)
  user!: User;

  // @HasMany(() => Product)
  // products!: Product[]
}

// export const orderRepository = sequelize.getRepository(Order);