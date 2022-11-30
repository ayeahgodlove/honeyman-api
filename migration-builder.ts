import { Sequelize } from "sequelize-typescript";
import { join } from "path";
import dotenv from "dotenv";

import { CategoryModel } from "./src/Repository/Models/CategoryModel";
import { SubCategoryModel } from "./src/Repository/Models/SubCategoryModel";
import { UserModel } from "./src/Repository/Models/UserModel";
import { ProductModel } from "./src/Repository/Models/ProductModel";
import { OrderModel } from "./src/Repository/Models/OrderModel";
import { PaymentModel } from "./src/Repository/Models/PaymentModel";

import { SequelizeTypescriptMigration } from "sequelize-typescript-migration-lts";

dotenv.config();

const bootstrap = async () => {
  const sequelize: Sequelize = new Sequelize({
    username: "postgres",
    password: "admin@2022",
    database: "honeyman_db",
    port: 5432,
    host: "localhost",
    dialect: "postgres",
    repositoryMode: true,
    models: [
      CategoryModel,
      SubCategoryModel,
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
  try {
    const result = await SequelizeTypescriptMigration.makeMigration(sequelize, {
      outDir: join(__dirname, "./db/migrations"),
      migrationName: "init-migrations",
      debug: true,
      preview: false,
    });
    console.log("result: ", result.msg);
  } catch (e) {
    console.log("error: ", e);
  }
};

bootstrap();
