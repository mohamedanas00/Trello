import userModel from "../../../../DB/model/userModel.js"
import { asyncHandler } from "../../utils/errorHandeling.js"
import bcrypt from 'bcryptjs'

//Extra{ Get Details} 
export const getUser=asyncHandler(async(req,res,next)=>{
    return res.json({
        message: "Done🟩",
        user:req.user
    })

})

//3-change password (user must be logged in)
export const changePassword=asyncHandler(async(req,res,next)=>{
    const{oldPassword,newPassword,cPassword}=req.body
    if(newPassword!=cPassword){
        return next(new Error("Check Your cPassword again!") )
    }
    console.log({ FE: oldPassword, HashDBPassword:  req.user.password });

    const checkOldPassword = bcrypt.compareSync(oldPassword, req.user.password)

    if(!checkOldPassword){
        return next(new Error("Your OldPassword is Wrong!") )
    }
    const hashPassword = bcrypt.hashSync(newPassword, 8)

    const userUpdate = await userModel.updateOne({ _id:req.user._id }, { password:hashPassword });
    return res.json({ message: "User Password Updated Successfully✅: ", userUpdate })

})



//4-update user (age , firstName , lastName)(user must be logged in)
export const updateUser= asyncHandler(async(req,res,next)=>{
    const{age , firstName , lastName}=req.body
    const userUpdate = await userModel.updateOne({ _id:req.user._id }, {  age , firstName , lastName });
    return res.json({ message: "User Updated Successfully✅: ", userUpdate })
})

//5-delete user(user must be logged in)
export const deleteUser=asyncHandler(async(req,res,next)=>{
    await userModel.deleteOne({ _id:req.user._id });
    return res.json({ message: "User Deleted Successfully✅: " })
})

//6-soft delete(user must be logged in)
export const softDelete=asyncHandler(async(req,res,next)=>{
    await userModel.updateOne({ _id:req.user._id }, {  isDeleted:true});
    return res.json({ message: "Done🟩" })
})



