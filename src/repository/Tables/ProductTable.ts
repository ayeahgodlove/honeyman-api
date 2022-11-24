import {
  DataTypes,
  Sequelize,
} from "sequelize";
import { IProduct } from "../Models/IProduct";


export const ProductTable = (sequelize: Sequelize) => {
  const Product = sequelize.define<IProduct>(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
  return Product;
};
