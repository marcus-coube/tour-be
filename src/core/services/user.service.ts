import { PrismaClient } from '@prisma/client';
import {ICreateUser, IUser} from "../../models/user.model";
import bcrypt from 'bcrypt';

export class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser({ email, name, password}: ICreateUser) {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // create user with hashed pass
        const user = await this.prisma.users.create({
            data: {
                email,
                name,
                password: passwordHash
            },
        });

        // remove password before returning
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;

    }


    async getAllUsers(): Promise<Omit<IUser, 'password'>[]> {
        try {
            const users: IUser[] = await this.prisma.users.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                }
            });

            return users;
        } catch (error) {
            throw new Error('Erro ao buscar usuários');
        }
    }

    async getUserById(id: string): Promise<Omit<IUser, 'password'> | null> {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                }
            });

            return user;
        } catch (error) {
            throw new Error('Erro ao buscar usuário');
        }
    }
}
