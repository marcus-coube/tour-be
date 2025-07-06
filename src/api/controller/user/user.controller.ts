import {Request, Response} from 'express';
import {UserService} from '../../../core/services/user.service';
import {TypedRequestBody} from "../../../core/types/request";
import {ICreateUser, IUser} from "../../../models/user.model";
import crypto from 'crypto';

type ICreateBodyReq = TypedRequestBody<ICreateUser>;

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();

        // Bind manual dos métodos
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.create = this.create.bind(this);
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';

            res.status(500).json({
                error: 'Erro ao buscar usuários',
                message: errorMessage
            });
        }
    }

    async getByEmail(req: Request, res: Response) {
        try {
            console.log('getting user by email', req);
            const email = req.params.email;

            if (!email) {
                return res.status(400).json({message: 'Email é obrigatório'});
            }

            const user = await this.userService.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({message: 'Usuário não encontrado'});
            }

            const {password: _, ...userWithoutPassword} = user;
            return res.status(200).json(userWithoutPassword);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return res.status(500).json({message: 'Erro interno do servidor'});
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                return res.status(404).json({message: 'Usuário não encontrado'});
            }

            res.json(user);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';

            res.status(500).json({
                error: 'Erro ao buscar usuários',
                message: errorMessage
            });
        }
    }

    async create(req: ICreateBodyReq, res: Response) {
        try {
            console.log('creating user');
            const newUser = req.body;
            let createdUser: IUser;
            if (!newUser.method) {
                return res.status(400).json({message: 'Método de cadastro inválido ou não informado'})
            }
            switch (newUser.method) {
                case 'INTERNAL':
                    const missingInternalFields = [];
                    if (!newUser.document) missingInternalFields.push('document');
                    if (!newUser.name) missingInternalFields.push('name');
                    if (!newUser.lastName) missingInternalFields.push('lastName');
                    if (!newUser.email) missingInternalFields.push('email');

                    if (missingInternalFields.length > 0) {
                        return res.status(400).json({
                            error: 'Campos obrigatórios não informados',
                            missingFields: missingInternalFields
                        });
                    }
                    newUser.name = `${newUser.name} ${newUser.lastName}`;
                    newUser.emailConfirmed = false;
                    newUser.registrationComplete = false;
                    createdUser = await this.userService.createUser(newUser)
                    return res.status(201).json(createdUser);
                case 'GOOGLE':
                    const missingGoogleFields = [];
                    if (!newUser.name) missingGoogleFields.push('name');
                    if (!newUser.email) missingGoogleFields.push('name');
                    if (!newUser.firebaseId) missingGoogleFields.push('email');

                    if (missingGoogleFields.length > 0) {
                        return res.status(400).json({
                            error: 'Campos obrigatórios não informados',
                            missingFields: missingGoogleFields
                        });
                    }

                    newUser.emailConfirmed = true;
                    newUser.registrationComplete = false;
                    newUser.name = `${newUser.name} ${newUser.lastName}`;
                    newUser.password = crypto.randomUUID();
                    console.log('creating new user with google: ', newUser);
                    createdUser = await this.userService.createUser(newUser);
                    return res.status(201).json(createdUser);
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({message: 'Erro interno do servidor'});
        }
    }

}
