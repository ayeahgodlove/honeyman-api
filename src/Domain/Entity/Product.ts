export interface User {
    id: string;
    name: string;
    price: string;
    description: string;
    categoryId: string;
    subCategoryId: string;
    imagePath: string;	
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}