import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user";
import { asyncHandler } from "../module/utils/errorHandeling";

export const auth=asyncHandler( async(req,res,next)=>{
    const{authorization}=req.headers;
    console.log({authorization})
    if(!authorization){
        return next(new Error("authorization is Required"))
    }
    const decoded = jwt.verify(authorization,'7mdaelHandMedoKEKO')
    console.log(decoded);
    //اتاكد ان اليوزر متمسحش
    //decode not return
    if(!decoded){
        return next(new Error("In-Valid User"),{cause:401})
    }
    //return but not have id
    if(!decoded?.id){
        return next(new Error("In-Valid User"),{cause:400})
    }
    const user =await userModel.findById(decoded.id)
    if(!user){
        return next(new Error("Not Register account"),{cause:400})

    }
    return next()
}
)
