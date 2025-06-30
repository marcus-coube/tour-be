import {Request, Response} from 'express';
import {UserService} from '../../../core/services/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.login = this.login.bind(this);
    }

    async login(req: Request, res: Response) {
        console.log('logging')
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                return res.status(400).json({error: 'Email e senha são obrigatórios'});
            }

            const user = await this.userService.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({error: 'Credenciais inválidas'});
            }

            const isPasswordValid = await bcrypt.compare(password, user.password!);

            if (!isPasswordValid) {
                return res.status(401).json({error: 'Credenciais inválidas'});
            }

            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user.id,
                    document: user.document,
                    isAdmin: user.isAdmin || false,
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: '24h',
                }
            );

            const date = new Date();
            date.setHours(date.getHours() + 24);

            return res.status(200).json({
                token,
                expiresIn: date.getTime(),
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin || false,
                }
            });
        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).json({error: 'Erro interno do servidor'});
        }
    }
}
