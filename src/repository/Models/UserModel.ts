import { DataTypes } from "sequelize";
import {
  Table,
  Model,
  Column,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "User",
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataTypes.NUMBER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  })
  username!: string;

  @Column({
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  })
  fullname!: string;

  @Column({
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  })
  password!: string;

  @Column({
    type: DataTypes.STRING(128),
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataTypes.STRING(128),
    allowNull: false,
  })
  role!: string;
  
  @Column({
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true
  })
  slug!: string;

  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  })
  updatedAt!: Date;
}
