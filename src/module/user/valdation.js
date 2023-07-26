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