import bcrypt from 'bcryptjs'
import { asyncHandler } from '../../utils/errorHandeling.js'
import userModel  from '../../../../DB/model/user.js'
import jwt from "jsonwebtoken";

//1-signUp
export const signup =asyncHandler( async (req, res, next) => {
    const {userName , email , password ,phone,age , gender } = req.body
    console.log({ userName , email , password ,phone,age , gender });

    const checkUserEmail = await userModel.findOne({ email }) 
    const checkUserPhone = await userModel.findOne({ phone }) 

    if (checkUserEmail) {
        return next(new Error("Email Already Exist") )
    }
    if(checkUserPhone){
        return next(new Error("Phone Already Exist") )
    }
    const hashPassword = bcrypt.hashSync(password, 8)
    const user = await userModel.create({ userName,  email, password: hashPassword,phone,age , gender })
    return res.json({ message: "SignUp Successfully🟩", user })
}
)

//2-login-->with create token
export const login =asyncHandler( async (req, res, next) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.json({ message: "In-valid email" })
    }
    console.log({ FE: password, HashDBPassword: user.password });
    const match = bcrypt.compareSync(password, user.password)
    console.log({ match });
    if (!match) {
        return res.json({ message: "In-valid login data" })
    }
    const  token = jwt.sign({
        userName:user.userName,
        id:user._id },
        "7mdaelHandMedoKEKO"
    )
    return res.json({ message: "login Successfully🟩", token })
}
)