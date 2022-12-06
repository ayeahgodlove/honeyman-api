import { IBaseResponse } from "./BaseResponse";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  subCategoryId: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

export const emptyProduct: IProduct = {
  id: "",
  name: "",
  price: 0,
  description: "",
  categoryId: "",
  subCategoryId: "",
  imagePath: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  slug:""
};

export interface IProductResponse extends IBaseResponse {
  data: IProduct | null;
}
