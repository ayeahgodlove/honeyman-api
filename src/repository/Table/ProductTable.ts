import { IProduct } from "../Contracts/IProduct";
import { mySQLSequelize } from "../../config/MySQLConfig";
import { DataTypes } from "sequelize";

export const ProductTable = mySQLSequelize.define<IProduct>(
  "products",
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sub_categories",
        key: "id",
      },
    },
    imagePath: {
      type: DataTypes.STRING(128),
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
