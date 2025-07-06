export class IUser {
    public id: string;
    public name: string;
    public email: string;
    public document: string;
    public password?: string;
    public isAdmin?: boolean;  // Torne opcional

    constructor(data: IUser) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.document = data.document;
        this.password = data.password;
        this.isAdmin = !!data.isAdmin;
    }
}


export interface ICreateUser {
    email: string;
    name: string;
    lastName: string;
    document: string;
    password: string;
    firebaseId: string;
    method: 'INTERNAL' | 'GOOGLE'
    emailConfirmed: boolean;
    registrationComplete: boolean;
}
