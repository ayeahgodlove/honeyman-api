import { RequestHandler, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  IProduct,
  emptyProduct,
  IProductResponse,
} from "../Domain/Entity/IProduct";
import slugify from "slugify";
import { Product } from "../Repository/Models/Product";
import { uuid } from "uuidv4";

const getProducts: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Product.findAll();
    res.status(200).json(categories);
  }
);

const createProduct: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IProductResponse>) => {
    const { name, description, price, categoryId, subCategoryId, imagePath } =
      req.body;

    if (!name) {
      res.status(400).send({
        message: "Please add product!",
        success: false,
        validationErrors: ["Name field cannot be empty"],
        data: null,
      });
      throw new Error("Please add product");
    }
    const productItem = await Product.findOne({ where: { name } });
    if (productItem !== null) {
      res.status(400).send({
        message: "Item already exists!",
        success: false,
        validationErrors: [],
        data: null,
      });
    }

    try {
      const product: IProduct = {
        ...emptyProduct,
        name,
        price,
        description,
        categoryId,
        subCategoryId,
        imagePath,
        createdAt: new Date(),
        id: uuid(),
        slug: slugify(name, "-"),
      };

      const productResponse = await Product.create<Product>(product as any);
      res.status(201).json({
        data: productResponse as any,
        message: "Product Created Successfully!",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: "Product Creation Failed!",
        validationErrors: [...error],
        success: true,
      });
    }
  }
);

const updateProduct: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        description,
        price,
        categoryId,
        subCategoryId,
        imagePath,
        updatedAt,
      } = req.body;
      const { id } = req.params;

      const productItem = await Product.findByPk(id);
      if (productItem === null) {
        res.status(400).send({
          message: `(${name}) not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        const product = await productItem?.update({
          ...updateProduct,
          name,
          price,
          description,
          categoryId,
          subCategoryId,
          imagePath,
          id: uuid(),
          slug: slugify(name, "-"),
          updatedAt,
        });
        res.status(200).json({
          message: `${name} updated successfully!`,
          success: true,
          validationErrors: [],
          data: product,
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

const deleteProduct: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const productItem = await Product.findByPk(id);
      if (productItem === null) {
        res.status(400).send({
          message: `Product not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        await productItem?.destroy({
          force: true,
        });
        res.status(200).json({
          message: `Product deleted successfully!`,
          success: true,
          validationErrors: [],
          data: productItem,
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
export { getProducts, createProduct, updateProduct, deleteProduct };
