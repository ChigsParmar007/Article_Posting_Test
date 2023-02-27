const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const catchAsync = require('../Utils/catchAsync')
const AppError = require('../Utils/appError')

const tokenGenerate = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statuscode, res) => {
    const token = tokenGenerate(user._id)
    user.password = undefined

    res.status(statuscode).json({
        status: 'Success',
        token,
        user
    })
}

// ==================== REGISTER USER ====================
const signUp = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)
    user.password = undefined

    res.status(201).json({
        status: 'Success',
        user
    })
})

// ==================== LOGIN USER ====================
const signIn = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ userName: req.body.userName }).select('+password')

    if (!user || !(await user.correctPassword(req.body.password, user.password))) {
        return next(new AppError('Check your login credentials', 400))
    }

    createSendToken(user, 200, res)
})

module.exports = {
    signUp,
    signIn
}