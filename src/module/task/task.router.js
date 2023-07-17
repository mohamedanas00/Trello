import { Router } from "express";
import { auth } from "../../middleware/authentication.js";
import * as taskCountroller from "../task/controller/task.js"
const taskRouter = Router()


taskRouter.post('/',auth,taskCountroller.addTask)
taskRouter.get('/',taskCountroller.getAllTask)
taskRouter.put('/:id',auth,taskCountroller.updateTask)
taskRouter.delete('/:id',auth,taskCountroller.deleteTask)
taskRouter.get('/UserTasks',auth,taskCountroller.getOneUserTasks)
taskRouter.get('/AssignedTasks',auth,taskCountroller.getAssignedTasks)
taskRouter.get('/LateTasks',auth,taskCountroller.getLateTasks)






export default taskRouter