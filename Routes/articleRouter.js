const express = require('express')
const router = express.Router()
const { protect } = require('../Middlewares/authMiddleware')
const { createArticleMiddleware, updateArticleMiddleware } = require('../Middlewares/articleMiddleware')
const {
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticles,
    getArticlesByTopic,
    getMostRecentArticles,
    getArticlesOfFollowingUsers
} = require('../Controllers/articleController')

router.use(protect)

router
    .route('/')
    .post(createArticleMiddleware, createArticle)

router
    .route('/:id')
    .patch(updateArticleMiddleware, updateArticle)
    .delete(deleteArticle)

router
    .route('/')
    .get(getAllArticles)

router
    .route('/getArticlesOfFollowingUsers')
    .get(getArticlesOfFollowingUsers)

router
    .route('/getMostRecentArticles/:number')
    .get(getMostRecentArticles)


router
    .route('/:topicId')
    .get(getArticlesByTopic)

module.exports = router