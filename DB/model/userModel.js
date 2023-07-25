import { Schema ,Types,model } from "mongoose";

const userSchema =new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
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
    isOnline:{
        type:Boolean,
        default: false,
    },
    isDeleted:{
        type:Boolean,
        default: false,
    },
    todoTasks:[
        {
            type:Types.ObjectId,
            ref: 'Task'
        }
    ],
    assginTasks:[
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    confirmEmail: { type: Boolean, default: false },
    age:Number,
},{
    timestamps:true
})

const userModel=model('User',userSchema)
export default userModel