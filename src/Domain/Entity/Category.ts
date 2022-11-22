export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface SubCategory extends Category {
  categoryId: number;
}

export const emptyCategory: Category = {
  id: 0,
  name: "",
  slug: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

export const emptySubCategory: SubCategory = {
  ...emptyCategory,
  categoryId: 0,
};
