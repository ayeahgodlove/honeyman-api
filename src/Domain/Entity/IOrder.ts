import { IBaseResponse } from "./BaseResponse";

export interface IOrder {
  id: number;
  userId: number;
  productId: number;
  unitPrice: number;
  total: number;
  status: string;
  orderNo: string;
  createdAt: Date;
  updatedAt: Date;
}

export const emptyOrder: IOrder = {
  id: 0,
  userId: 0,
  productId: 0,
  unitPrice: 0,
  total: 0,
  status: "",
  orderNo: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface IOrderResponse extends IBaseResponse {
  data: IOrder;
}
