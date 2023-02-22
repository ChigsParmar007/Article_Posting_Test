const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    topicId: {
        type: mongoose.Schema.ObjectId,
        ref: 'topic',
        required: [true, 'Topic Id is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User Id is required']
    },
    published: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const articleSchema = mongoose.model('Article', schema)

module.exports = articleSchema