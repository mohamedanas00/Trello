import { Router } from "express";
import { auth } from "../../middleware/authentication.js";
import * as taskCountroller from "../task/controller/task.js"
import { valdation } from "../../middleware/validiation.js";
import * as validatores from './valdiation.js'

const taskRouter = Router()


taskRouter.post('/', auth, valdation(validatores.addTask), taskCountroller.addTask)
taskRouter.get('/', taskCountroller.getAllTask)
taskRouter.put('/:id', auth, valdation(validatores.updateTask), taskCountroller.updateTask)
taskRouter.delete('/:id', auth, valdation(validatores.deleteTask), taskCountroller.deleteTask)
taskRouter.get('/UserTasks', auth, taskCountroller.getOneUserTasks)
taskRouter.get('/AssignedTasks', auth, taskCountroller.getAssignedTasks)
taskRouter.get('/LateTasks', auth, taskCountroller.getLateTasks)






export default taskRouter