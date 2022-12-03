import { RequestHandler, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  ICategory,
  emptyCategory,
  ICategoryResponse,
} from "../Domain/Entity/ICategory";
import slugify from "slugify";
import { Category } from "../Repository/Models/Category";
import { uuid } from "uuidv4";
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

    try {
      const category: ICategory = {
        ...emptyCategory,
        id: uuid(),
        name,
        description,
        slug: slugify(name, "-"),
      };

      const categoryResponse = await Category.create<Category>(category as any);
      res.status(201).json({
        data: categoryResponse as any,
        message: "Category Created Successfully!",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: "Category Creation Failed!",
        validationErrors: [...error],
        success: true,
      });
    }
  }
);

const updateCategory: RequestHandler = asyncHandler(async (req, res) => {});
export { getCategories, createCategory };
