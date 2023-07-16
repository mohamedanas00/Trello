import { asyncHandler } from "../../utils/errorHandeling.js"

export const getUser=asyncHandler(async(req,res)=>{
    return res.json({
        message: "Done",
        user:req.user
    })

})
