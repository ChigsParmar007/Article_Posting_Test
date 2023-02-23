const Article = require('../Models/articleModel')
const Comment = require('../Models/commentModel')
const Followers = require('../Models/followersModel')
const Topic = require('../Models/topicModel')

// ----------------------------------------------
const createArticle = async (req, res, next) => {
    try {
        const validateTopic = await Topic.findOne({
            _id: req.body.topicId,
            topicName: req.body.topicName
        })

        if (!validateTopic) {
            return res.status(404).json({
                status: 'Failed',
                message: `${req.body.topicName} is not exists`
            })
        }

        const article = new Article({
            topicId: req.body.topicId,
            topicName: req.body.topicName,
            content: req.body.content,
            userId: req.user._id,
            userName: req.user.userName
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
    try {
        const articles = await Article.find()

        res.status(200).json({
            status: 'Success',
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

        if (JSON.stringify(req.user.userName) !== JSON.stringify(article.userName)) {
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
        const articles = await Article.find({ topicName: req.params.topicName })

        res.status(200).json({
            status: 'Success',
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
        const articles = await Article.find({ userName: req.params.userName })

        res.status(200).json({
            status: 'Success',
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
        const comments = await Article.find({
            userName: req.body.userName,
            topicName: req.params.topicName
        })

        res.status(200).json({
            status: 'Success',
            comments
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
                $limit: 5
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
        const currentUser = req.user

        const articles = await Followers.aggregate([
            {
                '$lookup': {
                    'from': 'articles',
                    'localField': 'user',
                    'foreignField': 'userName',
                    'as': 'articles'
                }
            }, {
                '$unwind': '$articles'
            }, {
                '$match': {
                    'follow': currentUser.userName
                }
            }, {
                '$project': {
                    '_id': 0,
                    'articles': 1
                }
            }
        ])

        res.status(200).json({
            status: 'Status',
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