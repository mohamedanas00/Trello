const dataMethods = ['body', 'params', 'query', 'headers', 'file']
export const valdation = (JoiSchema) => {
    return (req, res, next) => {
        const ValditaionErr = []
        dataMethods.forEach(key => {
            if (JoiSchema[key]) {
                const valdationResult = JoiSchema[key].validate(req[key], { abortEarly: false })
                if (valdationResult.error) {
                    ValditaionErr.push(valdationResult.error.details)
                }
            }
        })

        if (ValditaionErr.length > 0) {
            return res.json({ message: "validation Error", ValditaionErr })
        }
        return next()
    }
}