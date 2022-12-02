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

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "Order",
})
export class Order extends Model<Order> {
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
      model: User,
      key: "id",
    },
  })
  @ForeignKey(() => User)
  userId!: string;

  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  })
  @ForeignKey(() => Product)
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

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Product)
  products!: Product[]
}
