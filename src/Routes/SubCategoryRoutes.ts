import express from "express";
const subCategoriesRouter = express.Router();

import {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory
} from "../Controller/SubCategoriesController";

subCategoriesRouter.get("/", getSubCategories);
subCategoriesRouter.post("/", createSubCategory);
subCategoriesRouter.put("/:id", updateSubCategory);
subCategoriesRouter.delete("/:id", deleteSubCategory);

export  default subCategoriesRouter;
