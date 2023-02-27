const express = require('express')
const router = express.Router()
const { protect } = require('../Middlewares/authController')
const {
    createArticle,
    getAllArticles,
    updateArticle,
    getArticlesByTopic,
    getArticlesByUser,
    getArticlesByUserAndTopic,
    deleteArticle,
    getMostRecentArticles,
    getArticlesOfFollowingUsers,
    getCurrentlyLoggedinUserArticles
} = require('../Controllers/articleController')

router.use(protect)

router
    .route('/')
    .get(getAllArticles)

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

router
    .route('/')
    .post(createArticle)

router
    .route('/getCurrentlyLoggedinUserArticle')
    .get(getCurrentlyLoggedinUserArticles)

router
    .route('/:id')
    .patch(updateArticle)
    .delete(deleteArticle)

router
    .route('/getArticlesOfFollowingUsers')
    .get(getArticlesOfFollowingUsers)

module.exports = router