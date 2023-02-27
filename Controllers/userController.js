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
    const { email, password, passwordConfirm, phone } = req.body

    if (password !== passwordConfirm) {
        // return res.status(400).json({
        //     status: 'Failed',
        //     message: 'Password and Password Confirm are not match'
        // })
        return next(new AppError('Password and Password Confirm are not match', 400))
    }

    const phoneRegex = /^[9]+[0-9]{9}$/
    if (!phoneRegex.test(phone)) {
        // return res.status(400).json({
        //     status: 'Failed',
        //     message: 'Enter valid Phone'
        // })
        return next(new AppError('Enter valid Phone number', 400))
    }

    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!emailRegex.test(email)) {
        // return res.status(400).json({
        //     status: 'Failed',
        //     message: 'Enter valid Email'
        // })
        return next(new AppError('Enter valid Email Address', 400))
    }

    const user = await User.create(req.body)
    user.password = undefined

    res.status(201).json({
        status: 'Success',
        user
    })
})

// ==================== LOGIN USER ====================
const signIn = catchAsync(async (req, res) => {
    const { userName, password } = req.body

    if (!userName || !password) {
        // return res.status(401).json({
        //     status: 'Failed',
        //     message: 'Provide an Username and Password both'
        // })
        return next(new AppError('Provide an Username and Password both', 400))
    }

    // try {
    const user = await User.findOne({ userName }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        // return res.status(400).json({
        //     status: 'Failed',
        //     message: 'Check your login credentials'
        // })
        return next(new AppError('Check your login credentials', 400))
    }

    createSendToken(user, 200, res)
    // }
    // catch (err) {
    //     return res.status(400).json({
    //         status: 'Failed',
    //         message: err.message
    //     })
    // }
})

module.exports = {
    signUp,
    signIn
}