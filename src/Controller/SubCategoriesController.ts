import { RequestHandler, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  ISubCategory,
  emptySubCategory,
  ISubCategoryResponse,
} from "../Domain/Entity/ICategory";
import slugify from "slugify";
import { SubCategory } from "../Repository/Models/SubCategory";
import { uuid } from "uuidv4";

const getSubCategories: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await SubCategory.findAll();
    res.status(200).json(categories);
  }
);

const createSubCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response<ISubCategoryResponse>) => {
    const { name, description, categoryId } = req.body;

    if (!name) {
      res.status(400).send({
        message: "Please add sub category!",
        success: false,
        validationErrors: ["Name field cannot be empty"],
        data: null,
      });
      throw new Error("Please add sub category");
    }
    const subCategoryItem = await SubCategory.findOne({ where: { name } });
    if (subCategoryItem !== null) {
      res.status(400).send({
        message: "Item already exists!",
        success: false,
        validationErrors: [],
        data: null,
      });
    }

    try {
      const subCategory: ISubCategory = {
        ...emptySubCategory,
        id: uuid(),
        name,
        description,
        categoryId,
        slug: slugify(name, "-"),
      };

      const subCategoryResponse = await SubCategory.create<SubCategory>(
        subCategory as any
      );
      res.status(201).json({
        data: subCategoryResponse as any,
        message: "Sub category Created Successfully!",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: "Sub category Creation Failed!",
        validationErrors: [...error],
        success: true,
      });
    }
  }
);

const updateSubCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, description, updatedAt, categoryId } = req.body;
      const { id } = req.params;

      const subCategoryItem = await SubCategory.findByPk(id);
      if (subCategoryItem === null) {
        res.status(400).send({
          message: `(${name}) not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        const subCategory = await subCategoryItem?.update({
          ...updateSubCategory,
          id,
          name,
          slug: slugify(name, "-"),
          description,
          categoryId,
          updatedAt,
        });
        res.status(200).json({
          message: `${name} updated successfully!`,
          success: true,
          validationErrors: [],
          data: subCategory,
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

const deleteSubCategory: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, description, updatedAt } = req.body;
      const { id } = req.params;

      const subCategoryItem = await SubCategory.findByPk(id);
      if (subCategoryItem === null) {
        res.status(400).send({
          message: `(${name}) not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        await subCategoryItem?.destroy({
          force: true,
        });
        res.status(200).json({
          message: `${name} deleted successfully!`,
          success: true,
          validationErrors: [],
          data: subCategoryItem,
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
export {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
