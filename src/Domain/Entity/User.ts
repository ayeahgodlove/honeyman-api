export interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    password: string;
    address: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}