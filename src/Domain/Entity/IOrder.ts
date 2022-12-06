import { IBaseResponse } from "./BaseResponse";

export interface IOrder {
  id: string;
  userId: string;
  productId: string;
  unitPrice: number;
  total: number;
  status: string;
  orderNo: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

export const emptyOrder: IOrder = {
  id: "",
  userId: "",
  productId: "",
  unitPrice: 0,
  total: 0,
  status: "",
  orderNo: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  slug: "",
};

export interface IOrderResponse extends IBaseResponse {
  data: IOrder | null;
}
