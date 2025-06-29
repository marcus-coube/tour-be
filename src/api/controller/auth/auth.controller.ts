import {TypedRequestBody} from "../../../core/types/request";
import {RequestHandler} from "express";
import {IUser} from "../../../models/user.model";


type RequestBody = TypedRequestBody<ILogin>;

export const login: RequestHandler = async (req: RequestBody, res: Response) => {
    const { email, password } = req.body;

    const user: IUser = await getUserByEmailService(email);

    if (!user) {
        return res.status(401).send();
    }

    const result: boolean = await bcrypt.compare(password, user.password);

    if (!result) {
        return res.status(401).send();
    }
    if (result) {
        const token: string = jwt.sign(
            {
                email: user.email,
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            config.JWT_SECRET,
            {
                expiresIn: '24h',
            }
        );
        const date: Date = new Date();
        date.setHours(date.getHours() + 24);
        return res.status(200).json({ token, expiresIn: date.getTime() });
    }
};
