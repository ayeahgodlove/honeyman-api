import { PgSequelize } from "../Config/PgConfig";
import * as express from "express";
import asyncHandler from "express-async-handler";
import {
  Category,
  emptyCategory,
  ICategoryResponse,
} from "../Domain/Entity/Category";
import slugify from "slugify";
import { CategoryTable } from "../Repository/Table/CategoryTable";
import { CategoryModel } from "../Repository/Models/CategoryModel";
const _operation = CategoryTable(PgSequelize);

const getCategories: express.RequestHandler = asyncHandler(async (req, res) => {
  const categories= await CategoryModel.findAll();
  res.status(200).json(categories);
});

const createCategory: express.RequestHandler = asyncHandler(
  async (req: express.Request, res: express.Response<ICategoryResponse>) => {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).send();
      throw new Error("Please add category");
    }

    const category: Category = {
      ...emptyCategory,
      name,
      description,
      slug: slugify(name, "-"),
    };

    await _operation
      .create(category)
      .then((data: Category) => {
        console.log("data: ", data);
        return res.send({
          message: "Category Created Successfully!",
          success: true,
          validationErrors: [],
          data,
        });
      })
      .catch((err: any) => {
        console.log("error: ", err);
        return res.status(500).send({
          message: "There was an error creating category!",
          success: false,
          validationErrors: [...err],
          data: emptyCategory,
        });
      });
  }
);

const updateCategory: express.RequestHandler = asyncHandler(
  async (req, res) => {}
);
export { getCategories, createCategory };
