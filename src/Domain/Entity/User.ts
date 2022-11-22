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

export const emptyUser: User = {
    id: 0,
    username: "",
    fullname: "",
    email: "",
    password: "",
    address: "",
    role: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
}