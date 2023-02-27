const express = require('express')
const router = express.Router()
const { protect } = require('../Middlewares/authMiddleware')
const { createTopicMiddleware, updateTopicMiddleware } = require('../Middlewares/topicMiddleware')
const {
    createTopic,
    updateTopic,
    getAllTopics
} = require('../Controllers/topicController')

router.use(protect)

router
    .route('/')
    .get(getAllTopics)

router
    .route('/')
    .post(createTopicMiddleware, createTopic)

router
    .route('/:topicId')
    .patch(updateTopic, updateTopicMiddleware)

module.exports = router