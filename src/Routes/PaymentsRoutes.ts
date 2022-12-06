import express from "express";
const paymentsRouter = express.Router();

import {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment
} from "../Controller/PaymentsController";

paymentsRouter.get("/", getPayments);
paymentsRouter.post("/", createPayment);
paymentsRouter.put("/:id", updatePayment);
paymentsRouter.delete("/:id", deletePayment);

export  default paymentsRouter;
