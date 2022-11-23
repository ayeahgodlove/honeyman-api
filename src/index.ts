/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { requiresAuth } from "express-openid-connect";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import bodyParser from "body-parser";

import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";

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

var jwtCheck = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-78podwfm.us.auth0.com/.well-known/jwks.json",
  }) as any,
  audience: "http://localhost:7000",
  issuer: "https://dev-78podwfm.us.auth0.com/",
  algorithms: ["RS256"],
});

// app.use(jwtCheck); //donot authorize the whole application

//routes
app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// auth routes
app.get("/login", requiresAuth(), async (req: Request, res: Response) => {
  res.send({
    title: "Secured page",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});
app.get("/api/v1/authorized", jwtCheck, function (req, res) {
  res.send("Secured Resource");
});

// middleware interceptions
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`⚡️[server]: Listening on port ${PORT}`);
});
