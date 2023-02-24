const express = require('express')
const Article = require('../Models/articleModel')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const { getAll } = require('../Controllers/hadleFactory')
const {
    // getAllArticles,
    createArticle,
    updateArticle,
    getArticlesByTopic,
    getArticlesByUser,
    getArticlesByUserAndTopic,
    deleteArticle,
    getMostRecentArticles,
    getArticlesOfFollowingUsers,
    getCurrentlyLoggedinUserArticle
} = require('../Controllers/articleController')

router
    .route('/')
    .get(getAll(Article))

router
    .route('/getMostRecentArticles/:number')
    .get(getMostRecentArticles)

router
    .route('/getArticlesByTopic/:topicId')
    .get(getArticlesByTopic)

router
    .route('/getArticlesByUser/:userId')
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
    .route('/getCurrentlyLoggedinUserArticle')
    .get(getCurrentlyLoggedinUserArticle)

router
    .route('/:id')
    .patch(updateArticle)
    .delete(deleteArticle)

router
    .route('/getArticlesOfFollowingUsers')
    .get(getArticlesOfFollowingUsers)

module.exports = router