import connectDB from "../DB/connection"


const bootstrap = (app,express)=>{
    app.use(express.json())
    //userRouting
    //tasktrelloRouting
    //DB
    connectDB()
    app.use('*',(req,res,next)=>{
       return res.json({message:"In-Valide Routing❌"})
    })
}

export default bootstrap