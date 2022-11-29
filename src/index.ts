/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { checkJwt } from "./middlewares/authz.middleware";
// import { MySQLConnection } from "./config/MySQLConfig";
import categoriesRouter from "./Routes/CategoryRoutes";
import { PgConnection } from "./config/PgConfig";
dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();

/**
 *  App Configuration
 */
// enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(helmet());
app.use(cors());
app.use(express.json());

// initialize DB connection
// MySQLConnection();
PgConnection();

// app.use(jwtCheck); //donot authorize the whole application

//routes
app.get("/api", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// ✨ New! Mount authorization middleware
// app.use(checkJwt);
app.get("/api/authorized", checkJwt, function (req, res) {
  res.send({
    message: "Secured Resource",
    access_token: req.headers.authorization,
  });
});

// routes
app.use("/api/categories", categoriesRouter);
// middleware interceptions
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`⚡️[server]: Listening on port ${PORT}`);
});
