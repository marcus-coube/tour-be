export class IUser {
    public id: string;
    public name: string;
    public email: string;
    public document: string | null;
    public password?: string;
    public method: TUserCreationMethod;
    public firebaseId: string;
    public emailConfirmed: boolean;

    constructor(data: IUser) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.document = data.document;
        this.password = data.password;
        this.method = data.method;
        this.firebaseId = data.firebaseId;
        this.emailConfirmed = data.emailConfirmed;
    }
}


export interface ICreateUser {
    email: string;
    name: string;
    lastName: string;
    document?: string;
    password: string;
    firebaseId: string;
    method: TUserCreationMethod
    emailConfirmed: boolean;
    registrationComplete: boolean;
}

export type TUserCreationMethod = 'INTERNAL' | 'GOOGLE';
