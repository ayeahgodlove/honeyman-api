/**
 * Set-by-step build Node.js Resful CRUD API using Express, Sequelize with MySQL
 * Sequelize is a promise-based Node.j ORM that supports the dialects for Postgres, MysQL, and SQL server
 * Sequelize with MySQL
 */

import { CategoryModel } from "../Repository/Models/CategoryModel";
import { OrderModel } from "../Repository/Models/OrderModel";
import { PaymentModel } from "../Repository/Models/PaymentModel";
import { ProductModel } from "../Repository/Models/ProductModel";
import { SubCategoryModel } from "../Repository/Models/SubCategoryModel";
import { UserModel } from "../Repository/Models/UserModel";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  username: "postgres",
  password: "admin@2022",
  database: "honeyman_db",
  port: 5432,
  host: "localhost",
  dialect: "postgres",
  repositoryMode: true,
  models: [
    SubCategoryModel,
    CategoryModel,
    UserModel,
    ProductModel,
    OrderModel,
    PaymentModel,
  ],
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connection = async () => {
  await sequelize.sync()
    .then(() => console.log("Connection has been established successfully."))
    .catch((error) =>
      console.error("Unable to connect to the database:", error)
    );
};
