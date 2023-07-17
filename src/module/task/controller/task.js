import taskModel from "../../../../DB/model/taskModel.js"
import { asyncHandler } from "../../utils/errorHandeling.js"

//1-add task with status (toDo)(user must be logged in)
export const addTask =asyncHandler( async(req, res, next) => {
    const { title, description, deadline, assignTo } = req.body
    const currentDate = new Date();
    const date = new Date(deadline);
 
    console.log(currentDate,date);
    if(date<currentDate){
        return next(new Error("In-valid Date⏰") )
    }

    const task = await taskModel.create({ title, description, deadline, assignTo , userId:req.user._id })
    res.json({message:"Task Add Successfully🟩", task})
})   

//2-update task (title , description , status) and assign task to other user(user must be logged in) (creator only can update task)
export const updateTask =asyncHandler( async(req, res, next) => {
    const { title , description , status, assignTo } = req.body
    

})   

//4-get all tasks with user data
export const getAllTask =asyncHandler( async(req, res, next) => {
    const tasks = await taskModel.find().populate('userId');
    return res.json({message:"Done🟩",tasks})
})  