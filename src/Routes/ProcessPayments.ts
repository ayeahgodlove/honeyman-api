import express from "express";

const processPayments = express.Router();

import {
  initiatePayment,
  mesombTestApi,
  transactionStatus,
  getTransactions,
} from "../Controller/ProcessPaymentsController";

processPayments.post("/", initiatePayment);
processPayments.post("/test", mesombTestApi);
processPayments.get("/:reference", transactionStatus);
processPayments.post("/histories", getTransactions);

export default processPayments;
