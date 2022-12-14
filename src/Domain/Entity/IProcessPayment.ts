import { IBaseResponse } from "./BaseResponse";

export interface IProcessPayment {
  amount: number;
  operator: string;
  telephone: string;
  processDate: Date;
  signature: string;
}

export const emptyProcessPayment: IProcessPayment = {
  amount: 0,
  operator: "",
  telephone: "",
  processDate: new Date(),
  signature: "",
};

export interface IProcessPaymentResponse extends IBaseResponse {
  data: IProcessPayment | null;
}
