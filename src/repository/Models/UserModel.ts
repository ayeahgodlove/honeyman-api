import {
  Table,
  Model,
  Column,
  DataType
} from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  modelName: "User",
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id?: number;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true
  })
  username!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true
  })
  fullname!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true
  })
  password!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  role!: string;
  
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true
  })
  slug!: string;
}
