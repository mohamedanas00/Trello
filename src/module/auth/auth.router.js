import { Router } from "express";
import * as authController from './controller/auth.js'
import { auth } from "../../middleware/authentication.js";
import { valdation } from "../../middleware/validiation.js";
import * as validators from './valdation.js'

const authRouter = Router()
valdation

authRouter.post("/", valdation(validators.signup), authController.signup)
authRouter.post("/login", valdation(validators.login), authController.login)
authRouter.get("/confirmEmail/:token", authController.confirmEmail)
authRouter.get("/newConfirmEmail/:token", authController.newConfirmEmail)
authRouter.get("/unsupscribeEmail/:token", authController.unsupscribeEmail)


authRouter.patch('/', auth, authController.logout)



export default authRouter