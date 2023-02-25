const mongoose = require('mongoose')
const Followers = require('../Models/followersModel')
const User = require('../Models/userModel')

// ==================== FOLLOW ====================
const createFollow = async (req, res) => {
    try {
        if (JSON.stringify(req.user._id) === JSON.stringify(req.body.userId)) {
            return res.status(400).json({
                status: 'Failed',
                message: 'You cannot follow yourself'
            })
        }

        const userexists = await User.findById(req.body.userId)

        if (!userexists) {
            return res.status(404).json({
                status: 'Failed',
                message: `User does not exists which is you follow`
            })
        }

        const data = await Followers.findOne({
            userId: req.body.userId,
            followId: req.user._id
        })

        if (data) {
            return res.status(400).json({
                status: 'Failed',
                message: `You are already following`
            })
        }

        const follow = await Followers.create({
            userId: req.body.userId,
            followId: req.user._id
        })

        res.status(200).json({
            status: 'Success',
            follow
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ==================== GET ALL FOLLOWERS ====================
const getAllFollowers = async (req, res) => {
    try {

        const followers = await Followers.find({
            userId: req.user._id
        })

        res.status(200).json({
            status: 'Success',
            length: followers.length,
            followers
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ==================== GET ALL FOLLOWING ====================
const getAllFollowing = async (req, res) => {
    try {
        const following = await Followers.find({
            followId: req.user._id
        })

        res.status(200).json({
            status: 'Success',
            length: following.length,
            following
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

// ==================== UNFOLLOW ====================
const unfollow = async (req, res) => {
    try {
        const data = await Followers.findOne({
            userId: req.params.userId,
            followId: req.user._id
        })

        if (!data) {
            return res.status(400).json({
                status: 'Failed',
                message: 'You do not follow this user'
            })
        }

        const deleteddata = await Followers.findByIdAndDelete(data._id)

        res.status(200).json({
            status: 'Success',
            deleteddata
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Error',
            message: err.message
        })
    }
}

module.exports = {
    createFollow,
    getAllFollowers,
    getAllFollowing,
    unfollow
}