import mongoose from "mongoose";

const connectDB=mongoose.connect(`mongodb://localhost:27017/TrelloDB`).then(res=>{
    console.log(`ConnectionDB🟩`);
}).catch(err=>{
    console.log(`Faild..To Connect🟥`);
})

export default connectDB