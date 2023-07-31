import connectDB from "../DB/connection.js"
import authRouter from "./module/auth/auth.router.js"
import taskRouter from "./module/task/task.router.js"
import userRouter from "./module/user/user.router.js"
import { globalErrorHandling } from "./utils/errorHandeling.js"

const bootstrap = (app,express)=>{
    app.use(express.json())
    //authRouting
    app.use('/auth',authRouter)
    //userRouting
    app.use('/user',userRouter)
    //tasktrelloRouting
    app.use('/task',taskRouter)
    //DB
    connectDB()
    //middelware For static file
    app.use("/uploads",express.static("uploads")) 
    app.use('*',(req,res,next)=>{
       return res.json({message:"In-Valide Routing❌"})
    })
    app.use(globalErrorHandling)
}

export default bootstrap