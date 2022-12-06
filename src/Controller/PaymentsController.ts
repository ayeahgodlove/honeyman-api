import { RequestHandler, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  IPayment,
  emptyPayment,
  IPaymentResponse,
} from "../Domain/Entity/IPayment";
import slugify from "slugify";
import { Payment } from "../Repository/Models/Payment";
import { uuid } from "uuidv4";

const getPayments: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Payment.findAll();
    res.status(200).json(categories);
  }
);

const createPayment: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IPaymentResponse>) => {
    const { userId, amount, status, orderNo } = req.body;

    const productItem = await Payment.findOne({ where: { orderNo } });
    if (productItem !== null) {
      res.status(400).send({
        message: "Payment already made!",
        success: false,
        validationErrors: [],
        data: null,
      });
    }

    try {
      const product: IPayment = {
        ...emptyPayment,
        userId,
        status,
        orderNo,
        amount,
        createdAt: new Date(),
        id: uuid(),
        slug: slugify(`order no ${orderNo}`, "-"),
      };

      const productResponse = await Payment.create<Payment>(product as any);
      res.status(201).json({
        data: productResponse as any,
        message: "Payment Made Successfully!",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: "Payment Failed!",
        validationErrors: [...error],
        success: true,
      });
    }
  }
);

const updatePayment: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { userId, status, orderNo, amount, updatedAt } = req.body;

      const { id } = req.params;

      const productItem = await Payment.findByPk(id);
      if (productItem === null) {
        res.status(400).send({
          message: `Payment not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        const product = await productItem?.update({
          ...updatePayment,
          userId,
          amount,
          status,
          orderNo,
          createdAt: new Date(),
          id,
          slug: slugify(`order no ${orderNo}`, "-"),
          updatedAt,
        });
        res.status(200).json({
          message: `Payment no ${orderNo} updated successfully!`,
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

const deletePayment: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const productItem = await Payment.findByPk(id);
      if (productItem === null) {
        res.status(400).send({
          message: `Payment not found!`,
          validationErrors: [],
          success: false,
          data: null,
        });
      } else {
        await productItem?.destroy({
          force: true,
        });
        res.status(200).json({
          message: `Payment deleted successfully!`,
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
export { getPayments, createPayment, updatePayment, deletePayment };
