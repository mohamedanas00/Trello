import { Router } from "express";
import { auth } from "../../middleware/authentication.js";
import * as taskCountroller from "../task/controller/task.js"
const taskRouter = Router()


taskRouter.post('/',auth,taskCountroller.addTask)
taskRouter.get('/',taskCountroller.getAllTask)

export default taskRouter