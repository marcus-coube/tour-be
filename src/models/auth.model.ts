export interface ILogin {
    password: string;
    email: string;
}

export interface IUserFromToken {
    id: string;
    email: string;
    role?: string;
}