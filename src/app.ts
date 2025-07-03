import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from "path";

import userRoutes from './api/routes/user/user.route'
import partnerRoute from "./api/routes/partner/partner.route";
import authRoute from "./api/routes/auth/auth.route";
import corsOptions from "./cors.config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Adicionar esta linha para parsing de JSON
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse através de: http://192.168.1.232:${PORT}`);
});

app.use('/auth', authRoute);
app.use('/users', userRoutes);
app.use('/partners', partnerRoute);


app.get('/version', (req: any, res: any) => {
    return res.send({
        name: 'api',
        version: '0.0.1',
        description: 'This is the worker API of Tour Marilia',
    });
});