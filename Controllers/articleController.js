const Article = require('../Models/articleModel')

const createArticle = async (req, res, next) => {
    try {
        const article = await Article.create({
            topicId: req.body.topicId,
            content: req.body.content,
            author: req.user._id
        })
        res.status(201).json({
            status: 'Success',
            article
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

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
            status: 'Failed',
            message: err.message
        })
    }
}

const getArticleById = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id)

        res.status(200).json({
            status: 'Success',
            article
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

const updateArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id)

        if (!article) {
            return res.status(404).json({
                status: 'Failed',
                message: 'article not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(article.author)) {
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
            status: 'Failed',
            message: err.message
        })
    }
}

const deleteArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id)

        if (!article) {
            return res.status(404).json({
                status: 'Failed',
                message: 'article not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(article.author)) {
            return res.status(404).json({
                status: 'Failed',
                message: 'You can not delete this article because You are not the author of this article'
            })
        }

        const deletedData = await Article.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'Success',
            deletedData
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

const getArticlesByTopic = async (req, res, next) => {
    try {
        const articles = await Article.find({ topicId: req.body.topicId })

        res.status(200).json({
            status: 'Success',
            articles
        })
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    getArticlesByTopic
}