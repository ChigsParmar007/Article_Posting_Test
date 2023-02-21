const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is Required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required']
    },
    userName: {
        type: String,
        required: [true, 'UserName is Required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function (element) {
                return element === this.password;
            },
            message: 'Password and PasswordConfirm are not the same!'
        }
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

schema.pre('save', function (next) {
    if (!this.isModified('password')) return next()

    this.password = bcryptjs.hash(this.password, 12)

    this.passwordConfirm = undefined

    next()
})

schema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next()
})

const userSchema = mongoose.model('user', schema)

module.exports = userSchema