import joi from 'joi'
export const signup = joi.object({
    //userName,firstName, lastName , email , password,cPassword,phone,age,gender 
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(10).required(),
    userName: joi.string().alphanum().min(5).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
    age: joi.number().integer().positive().min(16).max(90),
    phone: joi.string().trim().pattern(/^(010|012|011|015)\d{8}$/).required(),
}).required()

//**password */
// At least 8 characters long
// Contains at least one uppercase letter
// Contains at least one lowercase letter
// Contains at least one digit
//Contains at least one special character (e.g., !@#$%^&*()-_=+[]{}|;:'",.<>?`~)

//alphanum->Requires the string value to only contain a-z, A-Z, and 0-9.

//joi .ref cpassword tb3
//valid a5oh

export const login = joi.object({
    email: joi.string().email({minDomainSegments:2,maxDomainSegments:4,tlds:{allow:['com','net','edu','eg']}}).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required(),
}).required()