const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    topicName: {
        type: String,
        required: [true, 'Topic name is required.'],
        unique: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User id is required.']
    },
    userName: {
        type: String,
        require: [true, 'User Name is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const topicSchema = mongoose.model('topic', schema)

module.exports = topicSchema