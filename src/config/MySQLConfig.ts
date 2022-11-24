/**
 * Set-by-step build Node.js Resful CRUD API using Express, Sequelize with MySQL
 * Sequelize is a promise-based Node.j ORM that supports the dialects for Postgres, MysQL, and SQL server
 * Sequelize with MySQL
 */

import { Sequelize } from "sequelize";

export const mySQLSequelize = new Sequelize(
  "honeyman-db",
  "root",
  "",
  {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false,
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

