import { IBaseResponse } from "./BaseResponse";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubCategory extends Category {
  categoryId: number;
}

export const emptyCategory: Category = {
  id: 0,
  name: "",
  slug: "",
  description: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface ICategoryResponse extends IBaseResponse {
  data: Category;
}


export const emptySubCategory: SubCategory = {
  ...emptyCategory,
  categoryId: 0,
};
export interface ISubCategoryResponse extends IBaseResponse {
  data: SubCategory;
}

