const Topic = require('../Models/topicModel')

// ==================== CREATE TOPIC ====================
const createTopic = async (req, res, next) => {
    try {
        const existsTopic = await Topic.findOne({ topicName: req.body.topicName })

        if (existsTopic) {
            return res.status(400).json({
                status: 'Failed',
                message: `${req.body.topicName} already exists`
            })
        }

        const topic = await Topic.create({
            topicName: req.body.topicName,
            userId: req.user._id
        })

        res.status(201).json({
            status: 'Success',
            topic
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

// ==================== UPDATE TOPIC ====================
const updateTopic = async (req, res, next) => {
    try {
        const topic = await Topic.findById(req.params.topicId)

        if (!topic) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Topic not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(topic.userId)) {
            return res.status(401).json({
                status: 'Failed',
                message: 'You can not update this topic because You are not the author of this topic'
            })
        }

        const updatedData = await Topic.findByIdAndUpdate(req.params.topicId, {
            topicName: req.body.topicName,
        }, { new: true })

        res.status(200).json({
            status: 'Success',
            updatedData
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

// ==================== GET TOPIC BY TOPIC NAME ====================
const getTopicByTopicName = async (req, res, next) => {
    try {
        // const topic = await Topic.findOne({ topicName: req.params.topicName })
        const topic = await Topic.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $match: {
                    topicName: req.params.topicName
                }
            },
            {
                $project: {
                    _id: {
                        id: '$_id',
                        topicName: '$topicName',
                    },
                    user: {
                        _id: 1,
                        userName: 1
                    }
                }
            }
        ])

        res.status(200).json({
            status: 'Success',
            topic
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

// ==================== GET ALL TOPICS ====================
const getAllTopics = async (req, res) => {
    try {
        // const topics = await Topic.find()

        const topics = await Topic.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    _id: {
                        id: '$_id',
                        topicName: '$topicName',
                    },
                    user: {
                        _id: 1,
                        userName: 1
                    }
                }
            }
        ])

        res.status(200).json({
            status: 'Success',
            length: topics.length,
            topics
        })
    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error.message
        })
    }
}

module.exports = {
    createTopic,
    getTopicByTopicName,
    updateTopic,
    getAllTopics
}