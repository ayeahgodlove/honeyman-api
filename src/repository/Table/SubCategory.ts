import { ISubCategory } from "../Contracts/ISubCategory";
import { DataTypes, Sequelize } from "sequelize";
import { CategoryTable } from "./CategoryTable";
import { PgSequelize } from "../../Config/PgConfig";
import { ProductTable } from "./ProductTable";

export const SubCategoryTable = (sequelize: Sequelize) => {
  const SubCategory = sequelize.define<ISubCategory>(
    "SubCategories",
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

  return SubCategory;
};
