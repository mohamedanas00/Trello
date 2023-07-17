import { Router } from "express";
import { auth } from "../../middleware/authentication.js";
import * as taskCountroller from "../task/controller/task.js"
const taskRouter = Router()


taskRouter.post('/',auth,taskCountroller.addTask)
export default taskRouter