const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const {
    createComment,
    updateComment,
    deleteComment,
    getAllCommentsOfLoggedinUser,
    getAllCommentsOfParticularArticle,
    getCommentsByUserAndArticle
} = require('../Controllers/commentController')

router.use(protect)

router
    .route('/getAllCommentsOfParticularArticle/:articleId')
    .get(getAllCommentsOfParticularArticle)

router
    .route('/getCommentsByUserAndArticle')
    .post(getCommentsByUserAndArticle)

router
    .route('/')
    .post(createComment)

router
    .route('/getAllCommentsOfLoggedinUser')
    .get(getAllCommentsOfLoggedinUser)

router
    .route('/:id')
    .patch(updateComment)
    .delete(deleteComment)

module.exports = router