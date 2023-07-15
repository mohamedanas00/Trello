import { Schema ,model } from "mongoose";

const userSchema =new Schema({
    userName:{
        type:String,
        required:true,
    } , 
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone:{
        type:String,
        unique:true,
        required: true   
    },
    gender: {
        type: String,
        default: "Male",
        enum: ['Male', 'Female']
    },
    age:Number,
},{
    timestamps:true
})

const userModel=model('User',userSchema)
export default userModel