
import { ISubCategory } from "../Contracts/ISubCategory";
import { mySQLSequelize } from "../../config/MySQLConfig";
import { DataTypes } from "sequelize";

export const SubCategoryTable = mySQLSequelize.define<ISubCategory>(
  "sub_categories",
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
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