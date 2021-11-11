
const asyncWrapper = (fn) => {
    return async (req,res,next) => {
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

const errorHandler = (err,req,res,next) => {
    return res.status(500).json({err})
}

module.exports = {asyncWrapper,errorHandler}