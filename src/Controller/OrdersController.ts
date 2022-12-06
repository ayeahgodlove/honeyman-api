import { RequestHandler, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IOrder, emptyOrder, IOrderResponse } from "../Domain/Entity/IOrder";
import slugify from "slugify";
import { Order } from "../Repository/Models/Order";
import { uuid } from "uuidv4";

const getOrders: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Order.findAll();
    res.status(200).json(categories);
  }
);

const createOrder: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IOrderResponse>) => {
    const { userId, productId, unitPrice, total, status, orderNo } = req.body;

    const productItem = await Order.findOne({ where: { orderNo } });
    if (productItem !== null) {
      res.status(400).send({
        message: "Order already exists!",
        success: false,
        validationErrors: [],
        data: null,
      });
    }

    try {
      const product: IOrder = {
        ...emptyOrder,
        userId,
        productId,
        unitPrice,
        total,
        status,
        orderNo,
        createdAt: new Date(),
        id: uuid(),
        slug: slugify(`order no ${orderNo}`, "-"),
      };

      const productResponse = await Order.create<Order>(product as any);
      res.status(201).json({
        data: productResponse as any,
        message: "Order Created Successfully!",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: "Order Creation Failed!",
        validationErrors: [...error],
        success: true,
      });
    }
  }
);

const updateOrder: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        userId,
        productId,
        unitPrice,
        total,
        status,
        orderNo,
        updatedAt,
      } = req.body;

      const { id } = req.params;

      const productItem = await Order.findByPk(id);
      if (productItem === null) {
        res.status(400).send({
          message: `Order not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        const product = await productItem?.update({
          ...updateOrder,
          userId,
          productId,
          unitPrice,
          total,
          status,
          orderNo,
          createdAt: new Date(),
          id,
          slug: slugify(`order no ${orderNo}`, "-"),
          updatedAt,
        });
        res.status(200).json({
          message: `Order no ${orderNo} updated successfully!`,
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

const deleteOrder: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const productItem = await Order.findByPk(id);
      if (productItem === null) {
        res.status(400).send({
          message: `Order not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        await productItem?.destroy({
          force: true,
        });
        res.status(200).json({
          message: `Order deleted successfully!`,
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
export { getOrders, createOrder, updateOrder, deleteOrder };
