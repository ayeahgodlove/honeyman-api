import express, { Express } from "express";
const categoriesRouter = express.Router();

import {
  createCategory,
  getCategories,
} from "../Controller/CategoriesController";
import { checkJwt } from "../middlewares/authz.middleware";

categoriesRouter.get("/", checkJwt, getCategories);
categoriesRouter.post("/", checkJwt, createCategory);

export  default categoriesRouter;
