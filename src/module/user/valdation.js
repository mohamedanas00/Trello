import joi from 'joi'
export const changePassword = {
    body:
        joi.object({
            //oldPassword,newPassword,cPassword
            oldPassword: joi.string().required(),
            newPassword: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required(),
            cPassword:joi.string().valid(joi.ref("newPassword")).required(),
        }).required()
}

export const updateUser={
    body:joi.object({
        //age, firstName, lastName
        firstName: joi.string().min(3).max(20),
        lastName: joi.string().min(3).max(10),
        age: joi.number().integer().positive().min(16).max(90),
    }).required()
}