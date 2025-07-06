import {PrismaClient} from '@prisma/client';
import {ICreateUser, IUser} from "../../models/user.model";
import bcrypt from 'bcrypt';

export class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        });
    }

    async createUser(data: ICreateUser) {
        console.log('create user: ', data);
        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password, saltRounds);

        // create user with hashed pass
        const user = await this.prisma.users.create({
            data: {
                name: data.name,
                document: data.document,
                email: data.email,
                password: data.password,
                method: data.method,
                emailConfirmed: !!data.emailConfirmed,
                registrationComplete: !!data.registrationComplete,
                firebaseId: data.firebaseId
            },
        });

        // remove password before returning
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await this.prisma.users.findUnique({
                where: {email}
            });
            return user;
        } catch (error) {
            throw new Error('Erro ao buscar usuário por email');
        }
    }


    async getAllUsers(): Promise<Omit<IUser, 'password'>[]> {
        try {
            return await this.prisma.users.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    document: true,
                    createdAt: true
                }
            });
        } catch (error) {
            throw new Error('Erro ao buscar usuários');
        }
    }

    async getUserById(id: string): Promise<Omit<IUser, 'password'> | null> {
        try {
            return await this.prisma.users.findUnique({
                where: {id},
                select: {
                    id: true,
                    name: true,
                    email: true,
                    document: true,
                    createdAt: true
                }
            });
        } catch (error) {
            throw new Error('Erro ao buscar usuário');
        }
    }
}
