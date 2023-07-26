import bcrypt from 'bcryptjs'
import { asyncHandler } from '../../utils/errorHandeling.js'
import userModel from '../../../../DB/model/userModel.js'
import jwt from "jsonwebtoken";
import sendEmail from '../../utils/email.js';


//1-signUp
export const signup = asyncHandler(async (req, res, next) => {
    const { userName, firstName, lastName, email, password, cPassword, phone, age, gender } = req.body
    console.log({ userName, firstName, lastName, email, password, phone, age, gender });

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
    const unsubscribeLinkToken = jwt.sign({ id: user._id, email: user.email }, process.env.EMAIL_SIGNATURE, { expiresIn: 60 * 60 * 24 * 30 * 30 })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const requestNewEmailLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${newConfirmEmailToken}`
    const unsubscribeLink = `${req.protocol}://${req.headers.host}/auth/unsupscribeEmail/${unsubscribeLinkToken}`
    const html = `<a href="${link}">Confirm Email✅</a>
    <br>
    <br>
    <a href="${requestNewEmailLink}">Request new confirm Email🔃</a>
    <br>
    <br>
    <a href="${unsubscribeLink}">Request To Unsubscribe </a>
    <br>
    <br>
    `
    await sendEmail({ to: email, subject: "Confirmation Email", html })
    return res.json({ message: "SignUp Successfully✅", user })
}
)

export const confirmEmail = asyncHandler(async (req, res, next) => {
    console.log("loalaoaloaloa🔃");
    const { token } = req.params;
    console.log({ token });
    const decoded = jwt.verify(token, process.env.EMAIL_SIGNATURE);
    console.log(decoded);
    const user = await userModel.findByIdAndUpdate(decoded.id, { confirmEmail: true })
    return user ? res.redirect("http://localhost:4200/#/login")
        : res.send(`<a href="http://localhost:4200/#/signUp">Ops looks like u don't have account yet follow me to signup now. </a>`)
})

export const unsupscribeEmail = asyncHandler(async (req, res, next) => {
    console.log("METYSRAAAAAA🔃");
    const { token } = req.params;
    console.log({ token });
    const decoded = jwt.verify(token, process.env.EMAIL_SIGNATURE);
    console.log(decoded);
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return res.send(`<a href="http://localhost:4200/#/signUp">Ops looks like u don't have account yet follow me to signup now. </a>`)
    }

    await userModel.deleteOne({ _id: decoded.id });

    const html = `<a href="unsupscribe Done Your Data Deleted">Confirm Email✅</a>`
    await sendEmail({ to: user.email, subject: "Unsupscribe ", html })
    return res.send(`<p>unsupscribe Done Your Data Deleted</p>`)
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
    const html = `<a href="${link}">Confirm Email✅</a>`
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