import { Router } from "express";
import * as authController from './controller/auth.js'

const authRouter = Router()


authRouter.post("/signup",authController.signup)
authRouter.get("/login",authController.login)


export default authRouter