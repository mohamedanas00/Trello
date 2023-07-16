import { Router } from "express";

import * as userController from './controller/user.js' 
import { auth } from "../../middleware/authentication.js";
const userRouter=Router()

userRouter.get('/',auth,userController.getUser)
userRouter.put('/',auth,userController.updateUser)
userRouter.patch('/',auth,userController.changePassword)
userRouter.delete('/',auth,userController.deleteUser)



export default userRouter