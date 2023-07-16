import { asyncHandler } from "../../utils/errorHandeling.js"

//Extra{ Get Details} 
export const getUser=asyncHandler(async(req,res)=>{
    return res.json({
        message: "Done",
        user:req.user
    })

})

//4-update user (age , firstName , lastName)(user must be logged in)
export const updateUser= asyncHandler(async(req,res)=>{
    
})