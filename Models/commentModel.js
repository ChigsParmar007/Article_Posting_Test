const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Comment is required.']
    },
    rating: {
        type: Number
    },
    atricleId: {
        type: mongoose.Schema.ObjectId,
        ref: 'article',
        required: [true, 'Article Id is required.']
    },
    authorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User Id is required.']
    },
    commentedAt: {
        type: Date,
        default: Date.now()
    }
})

const commentSchema = mongoose.model('comment', schema)

module.exports = commentSchema