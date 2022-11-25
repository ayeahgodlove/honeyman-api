import { DataTypes } from "sequelize";
import { mySQLSequelize } from "../../config/MySQLConfig";
import { ICategory } from "../Contracts/ICategory";

 export const CategoryTable = mySQLSequelize.define<ICategory>(
    "categories",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(128),
        allowNull: false,
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
