const Topic = require('../Models/topicModel')
const Article = require('../Models/articleModel')
const Followers = require('../Models/followersModel')
const Comment = require('../Models/commentModel')
const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync.js')
const mongoose = require('mongoose')

// ==================== CREATE ARTICLE ====================
const createArticle = catchAsync(async (req, res, next) => {
    const topicExists = await Topic.findById(req.body.topicId)

    if (!topicExists) {
        return next(new AppError('The topic you are creating an article is does not exist', 404))
    }

    const article = new Article(req.body)
    await article.save()

    res.status(201).json({
        article
    })
})

// ==================== UPDATE ARTICLE ====================
const updateArticle = catchAsync(async (req, res, next) => {
    const article = await Article.findOne({ _id: req.params.id, userId: req.body.userId })

    if (!article) {
        return next(new AppError('You can not update this article because You are not the author of this article', 404))
    }

    const updatedData = await Article.findByIdAndUpdate(req.params.id, {
        content: req.body.content,
    }, { new: true })

    res.status(200).json({
        updatedData
    })
})

// ==================== DELETE ARTICLE ====================
const deleteArticle = catchAsync(async (req, res, next) => {
    const getArticle = await Article.findOne({ _id: req.params.id, userId: req.body.userId })

    if (!getArticle) {
        return next(new AppError('You can not update this article because You are not the author of this article or article not found', 404))
    }

    const article = await Article.findByIdAndDelete(req.params.id)

    await Comment.deleteMany({ articleId: article._id })

    res.status(200).json({
        message: 'Article deleted successfully'
    })
})

// ==================== GET ALL ARTICLES ====================
const getAllArticles = catchAsync(async (req, res, next) => {
    // const articles = await Article.find()
    const articles = await Article.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $lookup: {
                from: 'topics',
                localField: 'topicId',
                foreignField: '_id',
                as: 'topic'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $unwind: '$topic'
        },
        {
            $project: {
                _id: {
                    id: '$_id',
                    content: '$content'
                },
                user: {
                    _id: 1,
                    'userName': 1
                },
                topic: {
                    _id: 1,
                    topicName: 1
                }
            }
        }
    ])

    res.status(200).json({
        length: articles.length,
        articles
    })
})

// ==================== GET ARTICLES BY TOPIC ====================
const getArticlesByTopic = catchAsync(async (req, res, next) => {
    const articles = await Article.find({ topicId: mongoose.Types.ObjectId(req.params.topicId) })

    res.status(200).json({
        length: articles.length,
        articles
    })
})

// ==================== GET MOST RECENT ARTICLES ====================
const getMostRecentArticles = catchAsync(async (req, res, next) => {
    const articles = await Article.aggregate([
        {
            $sort: { createdAt: -1 }
        },
        {
            $limit: Number(req.params.number)
        }
    ])

    res.status(200).json({
        length: articles.length,
        articles
    })
})

// ==================== GET ARTICLES OF FOLLOWING USER ====================
const getArticlesOfFollowingUsers = async (req, res, next) => {
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
                'followId': req.body.userId
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
        length: articles.length,
        articles
    })
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticles,
    getArticlesByTopic,
    getMostRecentArticles,
    getArticlesOfFollowingUsers
}