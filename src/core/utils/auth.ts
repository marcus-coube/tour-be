import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    email: string;
    role?: string;
}

export const generateToken = (user: TokenPayload) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1h'  // Token expira em 1 hora
        }
    );
};

// Função para verificar token (opcional)
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        return null;
    }
};
