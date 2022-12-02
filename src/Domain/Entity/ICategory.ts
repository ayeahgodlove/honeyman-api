import { IBaseResponse } from "./BaseResponse";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubCategory extends ICategory {
  categoryId: number;
}

export const emptyCategory: ICategory = {
  id: 0,
  name: "",
  slug: "",
  description: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface ICategoryResponse extends IBaseResponse {
  data: ICategory;
}

export const emptySubCategory: ISubCategory = {
  ...emptyCategory,
  categoryId: 0,
};
export interface ISubCategoryResponse extends IBaseResponse {
  data: ISubCategory;
}
