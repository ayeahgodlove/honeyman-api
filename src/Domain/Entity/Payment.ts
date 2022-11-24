import { IBaseResponse } from "./BaseResponse";

export interface Payment {
    id: string;
    userId: number;
    orderNo: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export const emptyPayment: Payment = {
    id: "",
    userId: 0,
    orderNo: "",
    amount: 0,
    status: "",
    createdAt: new Date(),
    updatedAt: new Date(),
}

export interface IPaymentResponse extends IBaseResponse {
    data: Payment;
  }
  