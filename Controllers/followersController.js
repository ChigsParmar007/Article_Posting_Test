const Followers = require('../Models/followersModel')

const createFollow = async (req, res) => {
    try {
        const follow = await Followers.create({
            user: req.body.user,
            follow: req.user.userName
        })

        res.status(200).json({
            status: 'Success',
            follow
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

const getAllFollowers = async (req, res) => {
    try {
        const followers = await Followers.find({
            user: req.user.userName
        })

        res.status(200).json({
            status: 'Success',
            followers
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

const getAllFollowing = async (req, res) => {
    try {
        const followers = await Followers.find({
            follow: req.user.userName
        })

        res.status(200).json({
            status: 'Success',
            followers
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Error',
            message: err.message
        })
    }
}

const unfollow = async (req, res) => {
    try {
        const data = await Followers.find({
            user: req.params.user,
            follow: req.user.userName
        })
        console.log(data)

        if (!data) {
            return res.status(404).json({
                status: 'Failed',
                message: `You are not follow ${req.params.user}`
            })
        }

        const deleteddata = await Followers.findByIdAndDelete(data._id)

        res.status(200).json({
            status: 'Success',
            deleteddata
        })
    }
    catch (err) {
        res.status(404).json({
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