const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'User Id is required.']
    },
    followId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Currently logged in User Id is required.']
    }
},
    {
        timestamps: true
    }
)

const followersSchema = mongoose.model('follower', schema)

module.exports = followersSchema