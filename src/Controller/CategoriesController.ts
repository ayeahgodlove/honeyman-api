import { mySQLSequelize } from "../config/MySQLConfig";
import * as express from "express";
import asyncHandler from "express-async-handler";
import {
  Category,
  emptyCategory,
  ICategoryResponse,
} from "../Domain/Entity/Category";
import slugify from "slugify";
import { CategoryTable } from "../repository/Table/CategoryTable";
const _operation = CategoryTable(mySQLSequelize);

const getCategories: express.RequestHandler = asyncHandler(async (req, res) => {
  const categories: Category[] = await _operation.findAll();
  res.status(200).json(categories);
});

const createCategory:  express.RequestHandler = asyncHandler(
  async (
    req: express.Request,
    res: express.Response<ICategoryResponse>
  ) => {
    const { name, slug, createdAt } = req.body;

    if (!name) {
      res.status(400).send();
      throw new Error("Please add category");
    }

    const category: Category = {
      ...emptyCategory,
      name,
      slug: slugify(name, "-"),
      createdAt,
    };

    await _operation
      .create(category)
      .then((data: Category) =>
        res.send({
          message: "Category Created Successfully!",
          success: true,
          validationErrors: [],
          data,
        })
      )
      .catch((err: any) =>
        res.status(500).send({
          message: "There was an error creating category!",
          success: false,
          validationErrors: [err],
          data: emptyCategory,
        })
      );
  }
);

export { getCategories, createCategory };
