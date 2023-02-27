const express = require('express')
const { signUp, signIn } = require('../Controllers/userController')
const router = express.Router()
const { signupMiddleware } = require('../Middlewares/authController')

router
    .route('/signup')
    .post(signupMiddleware, signUp)

router.post('/signin', signIn)

module.exports = router