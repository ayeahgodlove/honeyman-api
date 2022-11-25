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
    type: DataType.NUMBER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  })
  @ForeignKey(() => UserModel)
  userId!: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    references: {
      model: "Product",
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

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @BelongsTo(() => ProductModel)
  product!: ProductModel;
}




// import { DataTypes } from "sequelize";
// import { IOrder } from "../Contracts/IOrder";
// import { mySQLSequelize } from "../../config/MySQLConfig";

// export const OrderModel = mySQLSequelize.define<IOrder>(
//   "orders",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "users",
//         key: "id",
//       },
//     },

//     productId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "products",
//         key: "id",
//       },
//     },
//     unitPrice: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     total: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//     },
//     orderNo: {
//       type: DataTypes.STRING(40),
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     paranoid: true,
//     timestamps: true,
//   }
// );
