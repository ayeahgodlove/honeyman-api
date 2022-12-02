import express, { Express } from "express";
const categoriesRouter = express.Router();

import {
  createCategory,
  getCategories,
} from "../Controller/CategoriesController";

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/", createCategory);

export  default categoriesRouter;
