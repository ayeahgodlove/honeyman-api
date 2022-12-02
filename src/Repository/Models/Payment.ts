import { sequelize } from "../../Config/connection";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Payments",
})
export class Payment extends Model {
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

  @BelongsTo(() => User)
  user!: User;
}

export const paymentRepository = sequelize.getRepository(Payment);