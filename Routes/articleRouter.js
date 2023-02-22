const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const { getAllArticles,
    createArticle,
    updateArticle,
    getArticlesByTopic,
    getArticlesByUser,
    getArticlesByUserAndTopic
} = require('../Controllers/articleController')

router
    .route('/')
    .get(getAllArticles)

router
    .route('/getArticlesByTopic/:topicName')
    .get(getArticlesByTopic)

router
    .route('/getArticlesByUser/:userName')
    .get(getArticlesByUser)

router
    .route('/getArticlesByUserAndTopic')
    .post(getArticlesByUserAndTopic)

// Use a middleware to identify the user to perform below actions
router.use(protect)

router
    .route('/')
    .post(createArticle)

router
    .route('/:id')
    .patch(updateArticle)

module.exports = router