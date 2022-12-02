import { join } from "path";
import dotenv from "dotenv";

import { SequelizeTypescriptMigration } from "sequelize-typescript-migration-lts";
import { sequelize } from "./src/Config/connection";

dotenv.config();

const bootstrap = async () => {
  
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
