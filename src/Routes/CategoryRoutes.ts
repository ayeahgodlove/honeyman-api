import express, { Express } from "express";
const categoriesRouter = express.Router();

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../Controller/CategoriesController";

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/", createCategory);
categoriesRouter.put("/:id", updateCategory);
categoriesRouter.delete("/:id", deleteCategory);

export  default categoriesRouter;
