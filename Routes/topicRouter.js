const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const {
    createTopic,
    getTopicByTopicName,
    updateTopic,
    getAllTopics
} = require('../Controllers/topicController')

router.use(protect)

router
    .route('/')
    .get(getAllTopics)

router
    .route('/:topicName')
    .get(getTopicByTopicName)

router
    .route('/')
    .post(createTopic)

router
    .route('/:topicId')
    .patch(updateTopic)

module.exports = router