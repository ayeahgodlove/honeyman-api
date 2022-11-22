export interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    categoryId: number;
    subCategoryId: number;
    imagePath: string;	
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export const emptyProduct: Product= {
    id: 0,
    name: "",
    price: "",
    description: "",
    categoryId: 0,
    subCategoryId: 0,
    imagePath: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
}