const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')

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

// Register User
const signUp = async (req, res, next) => {
    const { email, password, passwordConfirm, phone } = req.body

    if (password !== passwordConfirm) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Password and Password Confirm are not match'
        })
    }

    const phoneRegex = /^[9]+[0-9]{9}$/
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Enter valid Phone'
        })
    }

    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    // const emailRegex = /^[a-zA-Z0-9._]+@+[a-zA-Z]+\\.[a-z]{2,3}]/
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Enter valid Email'
        })
    }

    try {
        const user = await User.create(req.body)
        user.password = undefined

        res.status(201).json({
            status: 'Success',
            user
        })
    }
    catch (err) {
        return res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

// Login User
const signIn = async (req, res, next) => {
    const { userName, password } = req.body

    if (!userName || !password) {
        return res.status(401).json({
            status: 'Failed',
            message: 'Provide an Username and Password both'
        })
    }

    try {
        const user = await User.findOne({ userName }).select('+password')

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Check your login credentials'
            })
        }

        createSendToken(user, 201, res)
    }
    catch (err) {
        return res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

module.exports = {
    signUp,
    signIn
}