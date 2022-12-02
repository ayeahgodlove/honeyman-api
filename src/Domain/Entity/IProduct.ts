import { IBaseResponse } from "./BaseResponse";

export interface IProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  categoryId: number;
  subCategoryId: number;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export const emptyProduct: IProduct = {
  id: 0,
  name: "",
  price: "",
  description: "",
  categoryId: 0,
  subCategoryId: 0,
  imagePath: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface IProductResponse extends IBaseResponse {
  data: IProduct;
}
