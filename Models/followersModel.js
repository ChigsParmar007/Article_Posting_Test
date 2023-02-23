const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User Id is required.']
    },
    user: {
        type: String,
        required: [true, 'User Name is required.']
    },
    follow: {
        type: String,
        required: [true, 'Currently logged in User Name is required.']
    },
    followId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Currently logged in User Id is required.']
    }
})

const followersSchema = mongoose.model('follower', schema)

module.exports = followersSchema