export interface Order {
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

export const emptyOrder: Order = {
    id: 0,
    userId: 0,
    productId: 0,
    unitPrice: 0,
    total: 0,
    status: "",
    orderNo: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
}