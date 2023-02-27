const express = require('express')
const router = express.Router()
const { protect } = require('../Middlewares/authMiddleware')
const { createCommentMiddleware, updateCommentMiddleware } = require('../Middlewares/commentMiddleware')
const {
    createComment,
    updateComment,
    deleteComment,
    getAllCommentsOfParticularArticle,
} = require('../Controllers/commentController')

router.use(protect)

router
    .route('/')
    .post(createCommentMiddleware, createComment)

router
    .route('/:id')
    .patch(updateCommentMiddleware, updateComment)
    .delete(deleteComment)

router
    .route('/getAllCommentsOfParticularArticle/:articleId')
    .get(getAllCommentsOfParticularArticle)

module.exports = router