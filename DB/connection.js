import mongoose from "mongoose";

const connectDB=async ()=>{
    await mongoose.connect(process.env.DB_URL).then(res=>{
    console.log(`ConnectionDB🟩`);
}).catch(err=>{
    console.log(`Faild..To Connect🟥`);
})
}
export default connectDB