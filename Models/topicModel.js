const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    topicName: {
        type: String,
        required: [true, 'Topic name is required.'],
        unique: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        require: [true, 'Author name is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const topicSchema = mongoose.model('topic', schema)

module.exports = topicSchema