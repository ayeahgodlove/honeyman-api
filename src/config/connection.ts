/**
 * Set-by-step build Node.js Resful CRUD API using Express, Sequelize with MySQL
 * Sequelize is a promise-based Node.j ORM that supports the dialects for Postgres, MysQL, and SQL server
 * Sequelize with MySQL
 */
import { Sequelize } from "sequelize-typescript";

import { Category } from "../Repository/Models/Category";
import { Order } from "../Repository/Models/Order";
import { Payment } from "../Repository/Models/Payment";
import { Product } from "../Repository/Models/Product";
import { SubCategory } from "../Repository/Models/SubCategory";
import { User } from "../Repository/Models/User";
import { ProductOrder } from "../Repository/Models/ProductOrder";

export const sequelize = new Sequelize({
  username: "postgres",
  password: "admin@2022",
  database: "honeyman_db",
  port: 5432,
  host: "localhost",
  dialect: "postgres",
  // repositoryMode: true,
  models: [User, SubCategory, Order, ProductOrder, Product, Category, Payment],
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connection = async () => {
  // await sequelize
  //   .sync({ force: true })
  //   .then(() => console.log("Connection has been established successfully."))
  //   .catch((error) =>
  //     console.error("Unable to connect to the database:", error)
  //   );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
