import { RequestHandler, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  ICategory,
  emptyCategory,
  ICategoryResponse,
} from "../Domain/Entity/ICategory";
import slugify from "slugify";
import { Category } from "../Repository/Models/Category";

const getCategories: RequestHandler = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  res.status(200).json(categories);
});

const createCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response<ICategoryResponse>) => {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).send();
      throw new Error("Please add category");
    }

    const category: ICategory = {
      ...emptyCategory,
      name,
      description,
      slug: slugify(name, "-"),
    };
  }
);

const updateCategory: RequestHandler = asyncHandler(async (req, res) => {});
export { getCategories, createCategory };
