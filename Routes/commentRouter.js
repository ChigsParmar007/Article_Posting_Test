const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const { getAllComments, createComment, getCommentById, updateComment, deleteComment } = require('../Controllers/commentController')

router
    .route('/')
    .get(getAllComments)

router
    .route('/:id')
    .get(getCommentById)

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