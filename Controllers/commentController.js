const Comment = require('../Models/commentModel')

// ==================== CREATE COMMENT ====================
const createComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            comment: req.body.comment,
            rating: req.body.rating,
            articleId: req.body.articleId,
            userId: req.user._id
        })
        res.status(201).json({
            status: 'Success',
            comment
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ==================== UPDATE COMMENT ====================
const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if (!comment) {
            return res.status(404).json({
                status: 'Failed',
                message: 'comment not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(comment.userId)) {
            return res.status(401).json({
                status: 'Failed',
                message: 'You can not update this comment because You are not the author of this comment'
            })
        }

        const updatedData = await Comment.findByIdAndUpdate(req.params.id, {
            comment: req.body.comment,
            rating: req.body.rating
        }, { new: true })

        res.status(200).json({
            status: 'Success',
            updatedData
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ==================== GET ALL COMMENTS OF LOGGED IN USER ====================
const getAllCommentsOfLoggedinUser = async (req, res) => {
    try {
        const comments = await Comment.find({ userId: req.body._id })

        res.status(200).json({
            status: 'Success',
            length: comments.length,
            comments
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ==================== GET ALL COMMENTS OF PERTICULAR ARTICLE ====================
const getAllCommentsOfParticularArticle = async (req, res) => {
    try {
        const comments = await Comment.find({ articleId: req.params.articleId })

        res.status(200).json({
            status: 'Success',
            length: comments.length,
            comments
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ==================== GET ALL COMMENTS BY USER AND ARTICLE ====================
const getCommentsByUserAndArticle = async (req, res, next) => {
    try {
        const comments = await Comment.find({
            userId: req.body.userId,
            articleId: req.body.articleId
        })

        res.status(200).json({
            status: 'Success',
            length: comments.length,
            comments
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ==================== DELETE COMMENT ====================
const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if (!comment) {
            return res.status(404).json({
                status: 'Failed',
                message: 'comment not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(comment.userId)) {
            return res.status(401).json({
                status: 'Failed',
                message: 'You can not delete this comment because You are not the author of this comment'
            })
        }

        const deletedData = await Comment.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'Success',
            deletedData
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

module.exports = {
    createComment,
    getAllCommentsOfLoggedinUser,
    getAllCommentsOfParticularArticle,
    getCommentsByUserAndArticle,
    updateComment,
    deleteComment
}