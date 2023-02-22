const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    topicName: {
        type: String,
        required: [true, 'Topic Id is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    userName: {
        type: String,
        required: [true, 'User Name is required']
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