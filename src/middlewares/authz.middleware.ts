// src/middleware/authz.middleware.ts

import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import * as dotenv from "dotenv";

dotenv.config();

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-78podwfm.us.auth0.com/.well-known/jwks.json'
}) as any,
audience: 'https://www.honeyman-api.com',
issuer: 'https://dev-78podwfm.us.auth0.com/',
algorithms: ['RS256']
});