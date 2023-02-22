const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Comment is required.']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    articleId: {
        type: mongoose.Schema.ObjectId,
        ref: 'article',
        required: [true, 'Article Id is required.']
    },
    userName: {
        type: String,
        required: [true, 'User Name is required.']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const commentSchema = mongoose.model('comment', schema)

module.exports = commentSchema