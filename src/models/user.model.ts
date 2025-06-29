export class IUser {
    public id: string;
    public name: string;
    public email: string;
    public password?: string;
    public isAdmin?: boolean;  // Torne opcional

    constructor(data: IUser) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.isAdmin = !!data.isAdmin;
    }
}


export interface ICreateUser {
    email: string;
    name: string;
    password: string;
}
