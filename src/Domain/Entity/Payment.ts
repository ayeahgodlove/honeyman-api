export interface Payment {
    id: string;
    userId: number;
    orderNo: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export const emptyPayment: Payment = {
    id: "",
    userId: 0,
    orderNo: "",
    amount: 0,
    status: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
}