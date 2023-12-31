import { Router } from "express";

import * as userController from './controller/user.js'
import { auth } from "../../middleware/authentication.js";
import { valdation } from '../../middleware/validiation.js'
import * as validators from "./valdation.js";
import { upload } from "../../utils/multer.js";

const userRouter = Router()

userRouter.get('/', auth, userController.getUser)
userRouter.put('/', auth, valdation(validators.updateUser), userController.updateUser)
userRouter.patch('/', auth, valdation(validators.changePassword), userController.changePassword)
userRouter.delete('/', auth, userController.deleteUser)
userRouter.delete('/softDelete', auth, userController.softDelete)
userRouter.post('/profilePic', auth, upload({ folder: "user/profilepic" }).single("x"), userController.profilePic)




export default userRouter