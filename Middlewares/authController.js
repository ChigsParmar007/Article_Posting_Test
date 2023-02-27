const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const AppError = require('../Utils/appError')

const protect = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return res.status(403).json({
            status: 'Failed',
            message: 'You can not logged in. first log in and try again.'
        })
    }

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        const currentUser = await User.findById(decoded.id)

        if (!currentUser) {
            return res.status(401).json({
                status: 'Failed',
                message: 'user belonging to this token does no longer exist.'
            })
        }

        req.user = currentUser
        next()
    }
    catch (err) {
        return res.status(401).json({
            status: 'Failed',
            message: 'Invalid Token.'
        })
    }
}

const signupMiddleware = async (req, res, next) => {
    if (!req.body.firstName) return next(new AppError('Provide First Name', 400))
    if (!req.body.lastName) return next(new AppError('Provide Last Name', 400))
    if (!req.body.userName) return next(new AppError('Provide User Name', 400))
    if (!req.body.email) return next(new AppError('Provide Email', 400))
    if (!req.body.phone) return next(new AppError('Provide Phone Number', 400))
    if (!req.body.password) return next(new AppError('Provide Password', 400))
    if (!req.body.passwordConfirm) return next(new AppError('Provide Password Confirm', 400))

    next()
}

module.exports = {
    protect,
    signupMiddleware
}