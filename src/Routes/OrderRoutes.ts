import express from "express";
const ordersRoutes = express.Router();

import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} from "../Controller/OrdersController";

ordersRoutes.get("/", getOrders);
ordersRoutes.post("/", createOrder);
ordersRoutes.put("/:id", updateOrder);
ordersRoutes.delete("/:id", deleteOrder);

export  default ordersRoutes;
