const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'Username is required you want to follow']
    },
    follow: {
        type: String,
        required: [true, 'Currently logged in User Name is required.']
    }
})

const followersSchema = mongoose.model('followers', schema)

module.exports = followersSchema