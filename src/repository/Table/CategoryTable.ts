import { DataTypes, Sequelize } from "sequelize";
import { ICategory } from "../Contracts/ICategory";
import { PgSequelize } from "../../Config/PgConfig";
import { SubCategoryTable } from "./SubCategory";
import { ProductTable } from "./ProductTable";

export const CategoryTable = (sequelize: Sequelize) => {
  const Category = sequelize.define<ICategory>(
    "Categories",
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
      description: {
        type: DataTypes.TEXT,
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

  return Category;
};