import {
  IProcessPayment,
  IProcessPaymentResponse,
} from "@src/Domain/Entity/IProcessPayment";
import { RequestHandler, Request, Response, response } from "express";
import asyncHandler from "express-async-handler";
import axios, { AxiosResponse } from "axios";
import { uuid } from "uuidv4";
import https from "https";
import { PaymentOperation, Signature } from "@hachther/mesomb";
import fetch from "node-fetch";

// if (!globalThis.fetch) {
//   globalThis.fetch = fetch;
// }

const getToken = async (): Promise<{ token: string; expires_in: number }> => {
  const response = await axios.post(
    "https://demo.campay.net/api/token/",
    {
      username: `${process.env.CAMPAY_USERNAME}`,
      password: `${process.env.CAMPAY_PASSWORD}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

const initiateTransaction = async (
  body: IProcessPayment
): Promise<{
  reference: string;
  ussd_code: string;
  operator: string;
  initiated: boolean;
}> => {
  const token = await getToken();
  const response = await axios.post(
    "https://demo.campay.net/api/collect/",
    {
      amount: `${body.amount}`,
      currency: "XAF",
      from: "237673687549",
      description: "Pay for services",
      external_reference: "",
      external_user: "",
    },
    {
      headers: {
        Authorization: `Token ${token.token}`,
      },
    }
  );

  console.log("STATUS: ", response.statusText);
  return {
    ...response.data,
    initiated: response.statusText === "OK" ? true : false,
  };
};

const trackTransaction = async (
  reference: string
): Promise<{
  reference: string;
  status: string;
  amount: number;
  currency: string;
  operator: string;
  code: string;
  operator_reference: string;
}> => {
  const token = await getToken();

  const response = await axios.get(
    `https://demo.campay.net/api/transaction/${reference}/`,
    {
      headers: {
        Authorization: `Token ${token.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

const initiatePayment: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IProcessPaymentResponse>) => {
    const { amount, operator, telephone, processDate } = req.body;

    try {
      const initiatedResponse = await initiateTransaction({
        amount,
        operator,
        processDate: new Date(),
        telephone,
        signature: "",
      });

      if (!initiatedResponse.initiated) {
        res.status(400).json({
          message: "Transaction failed, please try again!",
          success: false,
          validationErrors: [],
          data: { ...initiatedResponse } as any,
        });
      }
      res.status(200).json({
        message: "Transaction Initiated!",
        success: true,
        validationErrors: [],
        data: { ...initiatedResponse } as any,
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Transaction failed, please try again!",
        success: false,
        validationErrors: [],
        data: error,
      });
    }
  }
);

const transactionStatus: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IProcessPaymentResponse>) => {
    const { reference } = req.params;
    const response = await trackTransaction(reference);

    res.status(200).json({
      message: `Transaction ${response.status}`,
      success: true,
      validationErrors: [],
      data: response as any,
    });
  }
);

const mesombTestApi: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IProcessPaymentResponse>) => {
    const payment = new PaymentOperation({
      applicationKey: `${process.env.MESOMB_APPLICATION_KEY}`,
      accessKey: `${process.env.MESOMB_ACCESS_KEY}`,
      secretKey: `${process.env.MESOMB_SECRET_KEY}`,
    });

    try {
      const response = await payment.makeCollect(
        100,
        "MTN",
        "677550203",
        new Date(),
        Signature.nonceGenerator()
      );
      console.log(response.isOperationSuccess());
      console.log(response.isTransactionSuccess());
      res.status(200).json({
        message: `Transaction Successful`,
        success: true,
        validationErrors: [],
        data: response as any,
      });
    } catch (error: any) {
      res.status(400).json({
        message: `${error.message}`,
        success: false,
        validationErrors: [],
        data: { ...error } as any,
      });
    }
  }
);

const getTransactions: RequestHandler = asyncHandler(
  async (req: Request, res: Response<IProcessPaymentResponse>) => {
    const { start_date, end_date } = req.body;
    const token = await getToken();
    try {
      const response = await axios.post(
        "https://demo.campay.net/api/history/",
        {
          start_date,
          end_date,
        },
        {
          headers: {
            Authorization: `Token ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.statusText === "OK") {
        res.status(200).json({
          message: `Successful!`,
          success: true,
          validationErrors: [],
          data: response.data as any,
        });
      } else {
        res.status(500).json({
          message: `Failed!`,
          success: false,
          validationErrors: [],
          data: response.data as any,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: `Failed! ${error.message}`,
        success: false,
        validationErrors: [],
        data: error as any,
      });
    }
  }
);

export { initiatePayment, getTransactions, transactionStatus, mesombTestApi };
