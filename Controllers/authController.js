const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')

// Protect Middleware for user validate user
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

module.exports = {
    protect
}