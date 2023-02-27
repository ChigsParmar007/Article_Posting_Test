const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const validator = require('validator')

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is Required.']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required.']
    },
    userName: {
        type: String,
        required: [true, 'UserName is Required.'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email address is Required.'],
        lowercase: true,
        validate: [validator.isEmail, 'Provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is Required.'],
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
                return element === this.password
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
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
},
    {
        timestamps: true
    }
)

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcryptjs.hash(this.password, 12)

    this.passwordConfirm = undefined

    next()
})

schema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next()
})

schema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcryptjs.compare(candidatePassword, userPassword)
}

const userSchema = mongoose.model('user', schema)

module.exports = userSchema