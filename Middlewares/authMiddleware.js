const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')
const mongoose = require('mongoose')

const protect = catchAsync(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new AppError('You can not logged in. first log in and try again.', 403))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const currentUser = await User.findById(mongoose.Types.ObjectId(decoded.id))

    if (!currentUser) {
        return next(new AppError('user belonging to this token does no longer exist.', 401))
    }
    req.user = currentUser
    req.body.userId = currentUser._id

    next()
})

const signupMiddleware = async (req, res, next) => {
    const missingValue = []
    if (!req.body.firstName) missingValue.push('Provide First Name')
    if (!req.body.lastName) missingValue.push('Provide Last Name')
    if (!req.body.userName) missingValue.push('Provide User Name')
    if (!req.body.email) missingValue.push('Provide Email')
    if (!req.body.phone) missingValue.push('Provide Phone Number')
    if (!req.body.password) missingValue.push('Provide Password')
    if (!req.body.passwordConfirm) missingValue.push('Provide Password Confirm')

    if (missingValue.length !== 0) return next(new AppError(`requird missing values : ${missingValue}`, 400))

    if (req.body.password > req.body.passwordConfirm) {
        return next(new AppError('Password and Password Confirm are not match', 400))
    }

    req.body.phone = Number.parseInt(req.body.phone)

    if ('number' !== typeof (req.body.phone)) {
        return next(new AppError('Phone Number is Must be a number', 400))
    }

    const phoneRegex = /^[9876]+[0-9]{9}$/
    if (!phoneRegex.test(req.body.phone)) {
        return next(new AppError('Enter valid Phone number. Mobile number always start with 6, 7, 8 and 9 and must be a 10 digit', 400))
    }

    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!emailRegex.test(req.body.email)) {
        return next(new AppError('Enter valid Email Address', 400))
    }

    next()
}

const signinMiddleware = async (req, res, next) => {
    const missingValue = []
    if (!req.body.userName) missingValue.push('Provide User Name')
    if (!req.body.password) missingValue.push('Provide password')

    if (missingValue.length > 0) return next(new AppError(`requird missing values: ${missingValue}`, 400))

    next()
}

module.exports = {
    protect,
    signupMiddleware,
    signinMiddleware
}