import { register } from "../Controller/UsersController";
import express from "express";
const userRoutes = express.Router();

import { checkJwt } from "../Middlewares/authz.middleware";

userRoutes.get("/register", checkJwt, register);
userRoutes.post("/login", checkJwt, register);

export default userRoutes;
