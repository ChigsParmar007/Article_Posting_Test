const express = require('express')
const { signUp, signIn } = require('../Controllers/userController')
const router = express.Router()

// Register User
router.post('/signup', signUp)

// Login User
router.post('/signin', signIn)

module.exports = router