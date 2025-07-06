import express, {Router} from "express";
import {UserController} from "../../controller/user/user.controller";


const userRoutes: Router = express.Router();
const userController = new UserController();

userRoutes.get('/', userController.getAll);
// @ts-ignore
userRoutes.post('/create', userController.create);
// @ts-ignore
userRoutes.get('/by-id/:id', userController.getById);
// @ts-ignore
userRoutes.get('/by-email/:email', userController.getByEmail);


export default userRoutes;
