import { Router } from "express";

import * as userController from './controller/user.js' 
import { auth } from "../../middleware/authentication.js";
const userRouter=Router()

userRouter.get('/',auth,userController.getUser)
export default userRouter