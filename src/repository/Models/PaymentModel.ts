import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType
} from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "Payment",
})
export class PaymentModel extends Model<PaymentModel> {
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
    type: DataType.STRING(40),
    allowNull: false,
    unique: true,
  })
  orderNo!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount!: number;

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
}


// import { IPayment } from "../Contracts/IPayment";
// import { mySQLSequelize } from "../../config/MySQLConfig";

// export const PaymentModel = mySQLSequelize.define<IPayment>(
//   "payments",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//       references: {
//         model: "users",
//         key: "id",
//       },
//     },
//     orderNo: {
//       type: DataTypes.STRING(40),
//       allowNull: false,
//       references: {
//         model: "users",
//         key: "id",
//       },
//     },
//     amount: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING(10),
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
