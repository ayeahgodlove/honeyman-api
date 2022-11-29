/**
 * Set-by-step build Node.js Resful CRUD API using Express, Sequelize with MySQL
 * Sequelize is a promise-based Node.j ORM that supports the dialects for Postgres, MysQL, and SQL server
 * Sequelize with MySQL
 */

import { Sequelize } from "sequelize";

export const mySQLSequelize = new Sequelize(
  "migration_db",
  "root",
  "",
  {
    dialect: "mysql",
    dialectOptions: {
      // Your mysql2 options here
      charset: "utf8mb4_general_ci", 
      multipleStatements: true
    },
    host: "localhost",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);

export const MySQLConnection = async () => {
  try {
    await mySQLSequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

