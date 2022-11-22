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
