import { Router } from "express";
import * as authController from './controller/auth.js'
import { auth } from "../../middleware/authentication.js";

const authRouter = Router()


authRouter.post("/",authController.signup)
authRouter.post("/login",authController.login)
authRouter.get("/confirmEmail/:token", authController.confirmEmail)
authRouter.get("/newConfirmEmail/:token", authController.newConfirmEmail)

authRouter.patch('/',auth,authController.logout)



export default authRouter