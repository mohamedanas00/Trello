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