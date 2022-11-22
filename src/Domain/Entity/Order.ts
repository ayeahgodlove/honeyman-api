export interface User {
    id: number;
    userId: number;
    productId: number;
    unitPrice: number;
    total: number;
    status: string;
    orderNo: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}