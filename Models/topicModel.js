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
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
    { versionKey: false }
)

const topicSchema = mongoose.model('topic', schema)

module.exports = topicSchema