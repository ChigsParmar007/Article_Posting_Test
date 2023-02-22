const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const {
    createComment,
    updateComment,
    deleteComment,
    getAllCommentsOfParticularUser,
    getAllCommentsOfParticularArticle,
    getCommentsByUserAndArticle
} = require('../Controllers/commentController')

router
    .route('/getAllCommentsOfParticularUser/:userName')
    .get(getAllCommentsOfParticularUser)

router
    .route('/getAllCommentsOfParticularArticle/:articleId')
    .get(getAllCommentsOfParticularArticle)

router
    .route('/getCommentsByUserAndArticle')
    .post(getCommentsByUserAndArticle)

// Use a middleware to identify the user to perform below actions
router.use(protect)

router
    .route('/')
    .post(createComment)

router
    .route('/:id')
    .patch(updateComment)
    .delete(deleteComment)

module.exports = router