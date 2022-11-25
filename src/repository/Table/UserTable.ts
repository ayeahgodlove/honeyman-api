import { DataTypes, Sequelize } from "sequelize";
import { IUser } from "../Contracts/IUser";

export const UserTable = (sequelize: Sequelize) => {
  const User = sequelize.define<IUser>(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  return User;
};
