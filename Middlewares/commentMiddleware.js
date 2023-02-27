const AppError = require('../Utils/appError')

const createCommentMiddleware = async (req, res, next) => {
    const missingValue = []
    if (!req.body.comment) missingValue.push('Enter comment you want to create in article')
    if (!req.body.articleId) missingValue.push('Provide Article you want to create comment.')

    if (missingValue.length > 0) return next(new AppError(`requird missing values : ${missingValue}`, 400))

    next()
}

const updateCommentMiddleware = async (req, res, next) => {
    if (!req.body.comment) return next(new AppError('Enter comment tou want to create in article', 400))

    next()
}

module.exports = {
    createCommentMiddleware,
    updateCommentMiddleware
}