const Article = require('../Models/articleModel')

// ----------------------------------------------
const createArticle = async (req, res, next) => {
    try {
        const article = await Article.create({
            topicName: req.body.topicName,
            content: req.body.content,
            userName: req.user.userName
        })
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
            topicName: req.body.topicName
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

module.exports = {
    createArticle,
    getAllArticles,
    updateArticle,
    getArticlesByTopic,
    getArticlesByUser,
    getArticlesByUserAndTopic
}