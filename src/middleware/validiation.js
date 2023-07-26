
export const valdation = (schema) => {
    return (req, res, next) => {
        const valdationResult = schema.validate(req.body)

        if (valdationResult.error) {
            return res.json({ message: "Valditaion Error", ERR: valdationResult.error.details })
        }
        return next()
    }
}