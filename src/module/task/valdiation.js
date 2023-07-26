import joi from 'joi'

export const addTask = {
    body: joi.object({
        // title, description, deadline, assignTo
        title: joi.string().min(1).max(50).required(),
        description: joi.string().min(3).required(),
        deadline: joi.string().pattern(new RegExp(/^(\d{4})-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])$/)).required(),
        assignTo: joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)).required(),
    }).required()
}

const allowedStatusValues = ['toDo', 'doing', 'done'];
export const updateTask = {

    body: joi.object({
        //title, description, status, assignTo
        title: joi.string().min(1).max(50),
        description: joi.string().min(3),
        assignTo: joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)),
        status: joi.string().valid(...allowedStatusValues).required(),
    }).required(),

    params: joi.object({
        //id
        id: joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)).required(),
    }).required()
}


export const deleteTask = {

    params: joi.object({
        //id
        id: joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)).required(),
    }).required()
}