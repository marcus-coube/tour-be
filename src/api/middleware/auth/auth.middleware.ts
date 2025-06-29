import { NextFunction, Request, RequestHandler, Response } from 'express';
import {TypedRequestBody} from "../../../core/types/request";
import jwt from 'jsonwebtoken';
import {IUserFromToken} from "../../../models/auth.model";

type RequestBody = TypedRequestBody<IUserFromToken>;

export const authMiddleware = (
    req: RequestBody,
    res: Response,
    next: NextFunction
) => {
    // Pegar token do header
    const authHeader = req.headers.authorization;

    // Verificar se token existe
    if (!authHeader) {
        return res.status(401).json({
            error: 'Token não fornecido'
        });
    }

    // Separar "Bearer" do token
    const [, token] = authHeader.split(' ');

    try {
        // Verificar e decodificar token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {
            id: string;
            email: string
        };

        // Adicionar informações do usuário ao request
        req.body = {
            id: decoded.id,
            email: decoded.email
        };

        // Continuar para próximo middleware
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                error: 'Token expirado'
            });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                error: 'Token inválido'
            });
        }

        // Erro genérico
        return res.status(500).json({
            error: 'Erro na autenticação'
        });
    }
};

// Middleware para verificar permissões específicas
export const roleMiddleware = (allowedRoles: string[]) => {
    // return (req: AuthRequest, res: Response, next: NextFunction) => {
    //     Verifica se usuário tem permissão
        // if (!req.user || !allowedRoles.includes(req.user.role || '')) {
        //     return res.status(403).json({
        //         error: 'Acesso negado'
        //     });
        // }
        //
        // next();
    // };
};