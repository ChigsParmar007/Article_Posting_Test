const Followers = require('../Models/followersModel')
const User = require('../Models/userModel')
const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')

// ==================== FOLLOW ====================
const createFollow = catchAsync(async (req, res, next) => {

    // Users cannot follow themselves
    if (JSON.stringify(req.body.userId) === JSON.stringify(req.body.followID)) {
        return next(new AppError('You cannot follow yourself', 400))
    }

    const userexists = await User.findById(req.body.followID)

    if (!userexists) {
        return next(new AppError('User does not exists which you want to follow', 404))
    }

    const data = await Followers.findOne({
        userId: req.body.followID,
        followId: req.body.userId
    })

    if (data) {
        return next(new AppError('You are already following This user', 400))
    }

    const follow = await Followers.create({
        userId: req.body.followID,
        followId: req.body.userId
    })

    res.status(200).json({
        message: 'Follow successful'
    })
})

// ==================== GET ALL FOLLOWERS ====================
const getAllFollowers = catchAsync(async (req, res, next) => {
    const followers = await Followers.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'followId',
                foreignField: '_id',
                as: 'followers'
            }
        },
        {
            $unwind: '$followers'
        },
        {
            $match: {
                'userId': req.user._id
            }
        },
        {
            '$project': {
                '_id': 0,
                'followers': 1
            }
        }
    ])

    res.status(200).json({
        length: followers.length,
        followers
    })
})

// ==================== GET ALL FOLLOWING ====================
const getAllFollowing = catchAsync(async (req, res, next) => {
    const following = await Followers.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'following'
            }
        },
        {
            $unwind: '$following'
        },
        {
            $match: {
                'followId': req.user._id
            }
        },
        {
            $project: {
                '_id': 0,
                'following': 1
            }
        }
    ])

    res.status(200).json({
        length: following.length,
        following
    })
})

// ==================== UNFOLLOW ====================
const unfollow = catchAsync(async (req, res, next) => {

    const userexists = await User.findById(req.body.userId)

    if (!userexists) {
        return next(new AppError('User does not exists which you want to follow', 404))
    }

    const data = await Followers.findOne({
        userId: req.params.userId,
        followId: req.user._id
    })

    if (!data) {
        return next(new AppError('You do not follow this user', 400))
    }

    const deleteddata = await Followers.findByIdAndDelete(data._id)

    res.status(200).json({
        message: 'Unfollow successful'
    })

})

module.exports = {
    createFollow,
    getAllFollowers,
    getAllFollowing,
    unfollow
}