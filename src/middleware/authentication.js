import jwt from "jsonwebtoken";
import userModel from "../../DB/model/userModel.js";
import { asyncHandler } from "../module/utils/errorHandeling.js";


// export let accessData
export const auth = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization.startsWith(process.env.TOKEN_BEARER));

    if (!authorization.startsWith(process.env.TOKEN_BEARER)) {
        return next(new Error("authorization is Required or Invalide Bearer key", { cause: 400 }))
    }

    const token = authorization.split(process.env.TOKEN_BEARER)[1]
   
    if (!token) {
        return next(new Error("Token is Required!", { cause: 400 }))
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE)
    console.log({ decoded });
    //اتاكد ان اليوزر متمسحش
    //decode not return
    if (!decoded) {
        return next(new Error("In-Valid User"), { cause: 401 })
    }
    //return but not have id
    if (!decoded?.id) {
        return next(new Error("In-Valid User"), { cause: 400 })
    }
    const user = await userModel.findById(decoded.id)

    if (!user) {
        return next(new Error("Not Register account🤔!Sign up"), { cause: 400 })
    }
    if (((!user.isOnline) || user.isDeleted)) {
        return next(new Error("Please logIn First"))
    }
    // accessData=user;
    req.user = user
    return next()
}
)