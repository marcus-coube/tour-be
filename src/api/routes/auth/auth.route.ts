import express, {Router} from "express";
import {AuthController} from "../../controller/auth/auth.controller";

const authRoutes: Router = express.Router();
const authController = new AuthController();

// @ts-ignore
authRoutes.get('/login', authController.login);

export default authRoutes;