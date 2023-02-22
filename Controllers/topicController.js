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
            status: 'Success',
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
            status: 'Success',
            message: err.message
        })
    }
}

const getTopicById = async (req, res, next) => {
    try {
        const topic = await Topic.find(req.params.id)

        res.status(200).json({
            status: 'Success',
            topic
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Success',
            message: err.message
        })
    }
}

const updateTopic = async (req, res, next) => {
    res.status(200).json({
        status: 'Success'
    })
}

const deleteTopic = async (req, res, next) => {
    try {
        const topic = await Topic.findById(req.params.id)
        console.log(req.user._id)
        console.log(topic.author)
        if (req.user._id !== topic.author) {
            return res.status(404).json({
                status: 'Failed',
                message: 'You can not delete this topic because You are not the author of this topic'
            })
        }
        res.status(200).json({
            status: 'Success'
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'Success',
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