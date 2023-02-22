const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, getArticlesByTopic } = require('../Controllers/articleController')

router
    .route('/')
    .get(getAllArticles)

router
    .route('/:id')
    .get(getArticleById)

router
    .route('/getArticlesByTopic')
    .post(getArticlesByTopic)

// Use a middleware to identify the user to perform below actions
router.use(protect)

router
    .route('/')
    .post(createArticle)

router
    .route('/:id')
    .patch(updateArticle)
    .delete(deleteArticle)

module.exports = router