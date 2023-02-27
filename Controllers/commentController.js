const Comment = require('../Models/commentModel')
const Article = require('../Models/articleModel')
const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')

// ==================== CREATE COMMENT ====================
const createComment = catchAsync(async (req, res, next) => {
    const articleExists = await Article.findById(req.body.articleId)

    if (!articleExists) {
        return next(new AppError('The article you are creating a comment is does not exist', 404))
    }
    const comment = await Comment.create(req.body)

    res.status(201).json({
        comment
    })
})

// ==================== UPDATE COMMENT ====================
const updateComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findOne({ _id: req.params.id, userId: req.body.userId })

    if (!comment) {
        return next(new AppError('You can not update this comment because You are not the author of this comment or omment not found', 404))
    }

    const updatedData = await Comment.findByIdAndUpdate(req.params.id, {
        comment: req.body.comment,
        rating: req.body.rating
    }, { new: true })

    res.status(200).json({
        updatedData
    })
})

// ==================== DELETE COMMENT ====================
const deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findOne({ _id: req.params.id, userId: req.body.userId })

    if (!comment) {
        return next(new AppError('You can not delete this comment because You are not the author of this comment or omment not found', 404))
    }

    const deletedData = await Comment.findByIdAndDelete(req.params.id)

    res.status(200).json({
        deletedData
    })
})

// ==================== GET ALL COMMENTS OF PERTICULAR ARTICLE ====================
const getAllCommentsOfParticularArticle = catchAsync(async (req, res) => {

    const comments = await Comment.find({ articleId: req.params.articleId })

    res.status(200).json({
        length: comments.length,
        comments
    })
})

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getAllCommentsOfParticularArticle
}