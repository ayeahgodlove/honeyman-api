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

  @BelongsTo(() => UserModel)
  user!: UserModel;
}