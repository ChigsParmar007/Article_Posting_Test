const express = require('express')
const Topic = require('../Models/topicModel')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const { getAll } = require('../Controllers/hadleFactory')
const { getAllTopics,
    createTopic,
    getTopicByTopicName,
    updateTopic
} = require('../Controllers/topicController')

router
    .route('/')
    .get(getAll(Topic))

router
    .route('/:topicName')
    .get(getTopicByTopicName)


router.use(protect)

router
    .route('/')
    .post(createTopic)

router
    .route('/:topicId')
    .patch(updateTopic)

module.exports = router