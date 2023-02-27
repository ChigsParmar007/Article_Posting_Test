const AppError = require('../Utils/appError')

const createTopicMiddleware = async (req, res, next) => {
    if (!req.body.topicName) return next(new AppError(`Provide Topic Name`, 400))

    next()
}

const updateTopicMiddleware = async (req, res, next) => {
    if (!req.body.topicName) return next(new AppError(`Provide Topic Name`, 400))

    next()
}

module.exports = {
    createTopicMiddleware,
    updateTopicMiddleware
}