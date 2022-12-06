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
const getCategories: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  }
);

const createCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response<ICategoryResponse>) => {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).send({
        message: "Please add category!",
        success: false,
        validationErrors: ["Name field cannot be empty"],
        data: null,
      });
      throw new Error("Please add category");
    }
    const categoryItem = await Category.findOne({ where: { name } });
    if (categoryItem !== null) {
      res.status(400).send({
        message: "Item already exists!",
        success: false,
        validationErrors: [],
        data: null,
      });
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

const updateCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, description, updatedAt } = req.body;
      const { id } = req.params;

      const categoryItem = await Category.findByPk(id);
      if (categoryItem === null) {
        res.status(400).send({
          message: `(${name}) not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        const category = await categoryItem?.update({
          ...updateCategory,
          id,
          name,
          slug: slugify(name, "-"),
          description,
          updatedAt,
        });
        res.status(200).json({
          message: `${name} updated successfully!`,
          success: true,
          validationErrors: [],
          data: category,
        });
      }
    } catch (error: any) {
      res.status(400).json({
        message: `failed to updated!`,
        success: false,
        validationErrors: [...error],
        data: null,
      });
    }
  }
);

const deleteCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const categoryItem = await Category.findByPk(id);
      if (categoryItem === null) {
        res.status(400).send({
          message: `Category not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        await categoryItem?.destroy({
          force: true,
        });
        res.status(200).json({
          message: `Category deleted successfully!`,
          success: true,
          validationErrors: [],
          data: categoryItem,
        });
      }
    } catch (error) {
      res.status(200).json({
        message: `failed to deleted!`,
        success: false,
        validationErrors: [],
        data: null,
      });
    }
  }
);
export { getCategories, createCategory, updateCategory, deleteCategory };
