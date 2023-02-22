const Comment = require('../Models/commentModel')

const createComment = async (req, res, next) => {
    try {
        const comment = await Comment.create({
            comment: req.body.comment,
            author: req.user._id
        })
        res.status(201).json({
            status: 'Success',
            comment
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find()

        res.status(200).json({
            status: 'Success',
            comments
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

const getCommentById = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)

        res.status(200).json({
            status: 'Success',
            comment
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if (!comment) {
            return res.status(404).json({
                status: 'Failed',
                message: 'comment not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(comment.authorId)) {
            return res.status(404).json({
                status: 'Failed',
                message: 'You can not update this comment because You are not the author of this comment'
            })
        }

        const updatedData = await Comment.findByIdAndUpdate(req.params.id, {
            comment: req.body.comment,
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

const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if (!comment) {
            return res.status(404).json({
                status: 'Failed',
                message: 'comment not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(comment.authorId)) {
            return res.status(404).json({
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
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
}