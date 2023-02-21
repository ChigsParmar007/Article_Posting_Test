const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')

// Protect Middleware for user validate user 
const protect = async (req, res, next) => {
    // 1) Getting token and check of it's there
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

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return res.status(401).json({
            status: 'Failed',
            message: 'user belonging to this token does no longer exist.'
        })
    }
    
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return res.status(401).json({
            status: 'Failed',
            message: 'User recently changed password! log in again.'
        })
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser
    res.locals.user = currentUser
    next()
}

module.exports = {
    protect
}