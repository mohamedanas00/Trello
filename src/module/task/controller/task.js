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
    return res.json({message:"Task Added Successfully🟩", task})
})   

//2-update task (title , description , status) and assign task to other user(user must be logged in) (creator only can update task)
export const updateTask =asyncHandler( async(req, res, next) => {
    const { title , description , status, assignTo } = req.body
    const {id}=req.params;
    const task = await taskModel.findById(id);
    if(!task){
        return next(new Error("In-valid Task📜") )
    }

    if(task.userId.toString()!=req.user._id.toString()){
        return next(new Error("You Do not have Permisson 🚧") )
    }
    await taskModel.updateOne({ _id:id }, {  title , description , status, assignTo});

    return res.json({message:"Task Updated Successfully🟩"})
})  

//3-delete task(user must be logged in) (creator only can delete task)
export const deleteTask =asyncHandler( async(req, res, next) => {
    const {id}=req.params;
    const task = await taskModel.findById(id);
    if(!task){
        return next(new Error("In-valid Task📜") )
    }

    if(task.userId.toString()!=req.user._id.toString()){
        return next(new Error("You Do not have Permisson 🚧") )
    }
    await taskModel.deleteOne({ _id:id });

    return res.json({message:"Task Deleted Successfully🟩"})
})  
//4-get all tasks with user data
export const getAllTask =asyncHandler( async(req, res, next) => {
    const tasks = await taskModel.find().populate('userId');
    return res.json({message:"Done🟩",tasks})
}) 

//5-get tasks of oneUser with user data (user must be logged in)
export const getOneUserTasks =asyncHandler( async(req, res, next) => {
    const tasks = await taskModel.find({userId:req.user._id}).populate('userId');
    return res.json({message:"Done🟩",tasks})
})

//6-get all tasks of oneUser with user data(assigned to me)
export const getAssignedTasks =asyncHandler( async(req, res, next) => {
    const tasks = await taskModel.find({assignTo:req.user._id}).populate('assignTo');
    return res.json({message:"Done🟩",tasks})
})

//7-get all tasks that not done after deadline
export const getLateTasks =asyncHandler( async(req, res, next) => {
    const currentDate = new Date();
    const tasks = await taskModel.find({userId:req.user._id,
          deadline: { $lte: currentDate } ,
          isDone: { $in: ['toDo', 'doing'] }})
    return res.json({message:"Done🟩",tasks})
})