import bcrypt from 'bcryptjs'
import { asyncHandler } from '../../utils/errorHandeling.js'
import userModel from '../../../../DB/model/userModel.js'
import jwt from "jsonwebtoken";
import sendEmail from '../../utils/email.js';
import * as validators from '../valdation.js'


//1-signUp
export const signup = asyncHandler(async (req, res, next) => {
    const { userName, firstName, lastName, email, password, cPassword, phone, age, gender } = req.body
    console.log({ userName, firstName, lastName, email, password, phone, age, gender });
    const valdationResult = validators.signup.validate(req.body)

    if (valdationResult.error) {
        return res.json({ message: "Valditaion Error", ERR: valdationResult.error.details })
    }

    if (password != cPassword) {
        return next(new Error("Check Your cPassword again!"))
    }

    const checkUserEmail = await userModel.findOne({ email })
    const checkUserPhone = await userModel.findOne({ phone })

    if (checkUserEmail) {
        return next(new Error("Email Already Exist"))
    }
    if (checkUserPhone) {
        return next(new Error("Phone Already Exist"))
    }
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
    const user = await userModel.create({ userName, firstName, lastName, email, password: hashPassword, phone, age, gender })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.EMAIL_SIGNATURE, { expiresIn: 60 * 5 })
    const newConfirmEmailToken = jwt.sign({ id: user._id, email: user.email }, process.env.EMAIL_SIGNATURE, { expiresIn: 60 * 60 * 24 * 30 })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const requestNewEmailLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${newConfirmEmailToken}`
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
    <style type="text/css">
    body{background-color: #88BDBF;margin: 0px;}
    </style>
    <body style="margin:0px;"> 
    <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
    <tr>
    <td>
    <table border="0" width="100%">
    <tr>
    <td>
    <h1>
        <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
    </h1>
    </td>
    <td>
    <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
    <tr>
    <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
    <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
    </td>
    </tr>
    <tr>
    <td>
    <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
    </td>
    </tr>
    <tr>
    <td>
    <p style="padding:0px 100px;">
    </p>
    </td>
    </tr>
    <tr>
    <td>
    <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
    </td>
    </tr>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <tr>
    <td>
    <a href="${requestNewEmailLink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">New Verify Email address</a>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
    <tr>
    <td>
    <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
    </td>
    </tr>
    <tr>
    <td>
    <div style="margin-top:20px;">

    <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
    
    <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
    </a>
    
    <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
    </a>

    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
    </html>`
    await sendEmail({ to: email, subject: "Confirmation Email", html })
    return res.json({ message: "SignUp Successfully🟩", user })
}
)

export const confirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params;
    console.log({ token });
    const decoded = jwt.verify(token, process.env.EMAIL_SIGNATURE);
    console.log(decoded);
    const user = await userModel.findByIdAndUpdate(decoded.id, { confirmEmail: true })
    return user ? res.redirect("http://localhost:4200/#/login")
        : res.send(`<a href="http://localhost:4200/#/signUp">Ops looks like u don't have account yet follow me to signup now. </a>`)
})

export const newConfirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params;
    console.log({ token });
    const decoded = jwt.verify(token, process.env.EMAIL_SIGNATURE);
    console.log(decoded);
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return res.send(`<a href="http://localhost:4200/#/signUp">Ops looks like u don't have account yet follow me to signup now. </a>`)
    }
    if (user.confirmEmail) {
        return res.redirect("http://localhost:4200/#/login")
    }

    const newToken = jwt.sign({ id: user._id, email: user.email }, process.env.EMAIL_SIGNATURE, { expiresIn: 60 * 2 })

    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
    <style type="text/css">
    body{background-color: #88BDBF;margin: 0px;}
    </style>
    <body style="margin:0px;"> 
    <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
    <tr>
    <td>
    <table border="0" width="100%">
    <tr>
    <td>
    <h1>
        <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
    </h1>
    </td>
    <td>
    <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
    <tr>
    <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
    <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
    </td>
    </tr>
    <tr>
    <td>
    <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
    </td>
    </tr>
    <tr>
    <td>
    <p style="padding:0px 100px;">
    </p>
    </td>
    </tr>
    <tr>
    <td>
    <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
    <tr>
    <td>
    <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
    </td>
    </tr>
    <tr>
    <td>
    <div style="margin-top:20px;">

    <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
    
    <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
    </a>
    
    <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
    </a>

    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
    </html>`
    await sendEmail({ to: user.email, subject: "Confirmation Email", html })
    return res.send(`<p>Check your inbox now</p>`)

})

//2-login-->with create token
export const login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    console.log(user);
    if (!user) {
        return next(new Error("In-valid email"))
    }
    if (!user.confirmEmail) {
        return next(new Error("Email not Confirmed"))
    }
    console.log({ FE: password, HashDBPassword: user.password });
    const match = bcrypt.compareSync(password, user.password)
    console.log({ match });
    if (!match) {
        return next(new Error("In-valid login data"))
    }
    const token = jwt.sign({
        userName: user.userName,
        id: user._id
    },
        process.env.TOKEN_SIGNATURE,
        { expiresIn: 60 * 60 }
    )
    //backonline
    await userModel.updateOne({ _id: user._id }, { isDeleted: false });
    await userModel.updateOne({ _id: user._id }, { isOnline: true });

    return res.json({ message: "login Successfully🟩", token })
}
)


//7-logout(online/offline)
export const logout = asyncHandler(async (req, res, next) => {
    await userModel.updateOne({ _id: req.user._id }, { isOnline: false });
    return res.json({ message: "You are now logged out🚪" })
})