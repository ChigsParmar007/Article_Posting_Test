const Topic = require('../Models/topicModel')

const createTopic = async (req, res, next) => {
    try {
        const topic = await Topic.create({
            topicName: req.body.topicName,
            author: req.user._id
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

const getAllTopics = async (req, res, next) => {
    try {
        const topics = await Topic.find()

        res.status(200).json({
            status: 'Success',
            topics
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

const getTopicById = async (req, res, next) => {
    try {
        const topic = await Topic.findById(req.params.id)

        res.status(200).json({
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

const updateTopic = async (req, res, next) => {
    try {
        const topic = await Topic.findById(req.params.id)

        if (!topic) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Topic not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(topic.author)) {
            return res.status(404).json({
                status: 'Failed',
                message: 'You can not update this topic because You are not the author of this topic'
            })
        }

        const updatedData = await Topic.findByIdAndUpdate(req.params.id, {
            topicName: req.body.topicName,
        }, { new: true })

        res.status(200).json({
            status: 'Success',
            updatedData
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

const deleteTopic = async (req, res, next) => {
    try {
        const topic = await Topic.findById(req.params.id)

        if (!topic) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Topic not found'
            })
        }

        if (JSON.stringify(req.user._id) !== JSON.stringify(topic.author)) {
            return res.status(404).json({
                status: 'Failed',
                message: 'You can not delete this topic because You are not the author of this topic'
            })
        }

        const deletedData = await Topic.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'Success',
            deletedData
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

module.exports = {
    createTopic,
    getAllTopics,
    getTopicById,
    updateTopic,
    deleteTopic
}