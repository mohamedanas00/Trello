import { Router } from "express";
import * as authController from './controller/auth.js'
import { auth } from "../../middleware/authentication.js";

const authRouter = Router()


authRouter.post("/",authController.signup)
authRouter.get("/",authController.login)
authRouter.patch('/',auth,authController.logout)



export default authRouter