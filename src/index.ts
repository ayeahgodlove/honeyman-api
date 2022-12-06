/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import { errorHandler } from "./Middlewares/error.middleware";
import { notFoundHandler } from "./Middlewares/not-found.middleware";
import categoriesRouter from "./Routes/CategoryRoutes";
import { connection } from "./Config/connection";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { login, register } from "./Controller/UsersController";
import subCategoriesRouter from "./Routes/SubCategoryRoutes";
import productsRouter from "./Routes/ProductRoutes";
import ordersRoutes from "./Routes/OrderRoutes";
require("./Auth/Passport");
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

require("./Auth/Passport");

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// initialize DB connection
connection();

//routes
app.get("/api", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

/**
 * Users controllers
 */
app.post("/api/register", register);
app.post("/api/login", login);

// ✨ New! Mount authorization middleware
app.get(
  "/api/authorized",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send({
      message: "Secured Resource",
      access_token: req.headers.authorization,
    });
  }
);

/**
 * categories and subcategories
 */
app.use(
  "/api/categories",
  passport.authenticate("jwt", { session: false }),
  categoriesRouter
);

app.use(
  "/api/sub-categories",
  passport.authenticate("jwt", { session: false }),
  subCategoriesRouter
);

/**
 * products
 */
app.use(
  "/api/products",
  passport.authenticate("jwt", { session: false }),
  productsRouter
);

/**
 * Order
 */
app.use(
  "/api/orders",
  passport.authenticate("jwt", { session: false }),
  ordersRoutes
);

/**
 * Payments
 */
app.use(
  "/api/payments",
  passport.authenticate("jwt", { session: false }),
  ordersRoutes
);
// middleware interceptions
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`⚡️[server]: Listening on port ${PORT}`);
});
