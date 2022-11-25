import { Sequelize } from "sequelize-typescript";
import { join } from "path";
import dotenv from "dotenv";

import { CategoryModel } from "./src/repository/Models/CategoryModel";
import { SubCategoryModel } from "./src/repository/Models/SubCategoryModel";
import { UserModel } from "./src/repository/Models/UserModel";
import { ProductModel } from "./src/repository/Models/ProductModel";
import { OrderModel } from "./src/repository/Models/OrderModel";
import { PaymentModel } from "./src/repository/Models/PaymentModel";

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
    models: [
      CategoryModel,
      SubCategoryModel,
      ProductModel,
      UserModel,
      OrderModel,
      PaymentModel,
    ],
    logging: false,
  });
  try {
    const result = await SequelizeTypescriptMigration.makeMigration(sequelize, {
      outDir: join(__dirname, "./db/migrations"),
      migrationName: "first_main_migration",
      debug: true,
      preview: true,
    });
    console.log("result: ", result);
  } catch (e) {
    console.log("error: ", e);
  }
};

bootstrap();
