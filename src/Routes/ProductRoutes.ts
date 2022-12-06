import express from "express";
const productsRouter = express.Router();

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../Controller/ProductsController";

productsRouter.get("/", getProducts);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

export  default productsRouter;
