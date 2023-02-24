const Article = require('../Models/articleModel')
const Comment = require('../Models/commentModel')
const Followers = require('../Models/followersModel')
const Topic = require('../Models/topicModel')

// ----------------------------------------------
const createArticle = async (req, res, next) => {
    try {
        const validateTopic = await Topic.findById(req.body.topicId)

        if (!validateTopic) {
            return res.status(404).json({
                status: 'Failed',
                message: `${req.body.topicId} does not exists`
            })
        }

        const article = new Article({
            topicId: req.body.topicId,
            content: req.body.content,
            userId: req.user._id
        })
        await article.save()

        res.status(201).json({
            status: 'Success',
            article
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

// -----------------------------------------------
const getAllArticles = async (req, res, next) => {
//     try {
//         const articles = await Article.find()

//         res.status(200).json({
//             status: 'Success',
//             length: articles.length,
//             articles
//         })
//     }
//     catch (err) {
//         res.status(404).json({
//             status: 'Error',
//             message: err.message
//         })
//     }
}

// ----------------------------------------------
const updateArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id)

        if (!article) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Article not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(article.userId)) {
            return res.status(404).json({
                status: 'Failed',
                message: 'You can not update this article because You are not the author of this article'
            })
        }

        const updatedData = await Article.findByIdAndUpdate(req.params.id, {
            content: req.body.content,
        }, { new: true })

        res.status(200).json({
            status: 'Success',
            updatedData
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ---------------------------------------------------
const getArticlesByTopic = async (req, res, next) => {
    try {
        const articles = await Article.find({ topicId: req.params.topicId })

        res.status(200).json({
            status: 'Success',
            length: articles.length,
            articles
        })
    } catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ---------------------------------------------------
const getArticlesByUser = async (req, res, next) => {
    try {
        const articles = await Article.find({ userId: req.params.userId })

        res.status(200).json({
            status: 'Success',
            length: articles.length,
            articles
        })
    } catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ------------------------------------------------------
const getArticlesByUserAndTopic = async (req, res) => {
    try {
        const articles = await Article.find({
            topicId: req.body.topicId,
            userId: req.body.userId
        })

        res.status(200).json({
            status: 'Success',
            length: articles.length,
            articles
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

const deleteArticle = async (req, res) => {
    try {
        const getArticle = await Article.findById(req.params.id)

        if (!getArticle) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Article not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(article.userId)) {
            return res.status(404).json({
                status: 'Failed',
                message: 'You can not update this article because You are not the author of this article'
            })
        }

        const article = await Article.findByIdAndDelete(req.params.id)

        await Comment.deleteMany({ articleId: article._id })

        res.status(200).json({
            status: 'Success'
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

const getMostRecentArticles = async (req, res) => {
    try {
        const articles = await Article.aggregate([
            {
                $sort: { createdAt: 1 }
            },
            {
                $limit: Number(req.params.number)
            }
        ])

        res.status(200).json({
            status: 'Status',
            length: articles.length,
            articles
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

const getArticlesOfFollowingUsers = async (req, res) => {
    try {
        const articles = await Followers.aggregate([
            {
                '$lookup': {
                    'from': 'articles',
                    'localField': 'userId',
                    'foreignField': 'userId',
                    'as': 'articles'
                }
            },
            {
                '$unwind': '$articles'
            },
            {
                '$match': {
                    'followId': req.user._id
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'articles': 1
                }
            }
        ])

        res.status(200).json({
            status: 'Status',
            length: articles.length,
            articles
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    updateArticle,
    getArticlesByTopic,
    getArticlesByUser,
    getArticlesByUserAndTopic,
    deleteArticle,
    getMostRecentArticles,
    getArticlesOfFollowingUsers
}