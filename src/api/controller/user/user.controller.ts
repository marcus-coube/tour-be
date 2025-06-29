import { Request, Response } from 'express';
import { UserService } from '../../../core/services/user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();

        // Bind manual dos métodos
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
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

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
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

     async create(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body;

            // Validações básicas
            if (!email || !name || !password) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const user = await this.userService.createUser({ email, name, password });
            return res.status(201).json(user);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

}
