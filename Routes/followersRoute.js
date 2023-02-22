const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const { createFollow, getAllFollowers, getAllFollowing, unfollow } = require('../Controllers/followersController')

router.use(protect)

router
    .route('/')
    .post(createFollow)

router
    .route('/getFollowers')
    .get(getAllFollowers)

router
    .route('/getFollowing')
    .get(getAllFollowing)

router
    .route('/unfollow/:user')
    .delete(unfollow)

module.exports = router