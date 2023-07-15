import connectDB from "../DB/connection.js"
import authRouter from "./module/auth/auth.router.js"


const bootstrap = (app,express)=>{
    app.use(express.json())
    //authRouting
    app.use('/auth',authRouter)
    //userRouting
    // app.use("/user")
    //tasktrelloRouting
    //DB
    connectDB()
    app.use('*',(req,res,next)=>{
       return res.json({message:"In-Valide Routing❌"})
    })
}

export default bootstrap