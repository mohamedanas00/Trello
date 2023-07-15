import connectDB from "../DB/connection.js"


const bootstrap = (app,express)=>{
    app.use(express.json())
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