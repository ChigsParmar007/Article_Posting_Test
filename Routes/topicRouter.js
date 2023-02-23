const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const { getAllTopics,
    createTopic,
    getTopicByTopicName,
    updateTopic
} = require('../Controllers/topicController')

router
    .route('/')
    .get(getAllTopics)

router
    .route('/:topicName')
    .get(getTopicByTopicName)


router.use(protect)

router
    .route('/')
    .post(createTopic)

router
    .route('/:id')
    .patch(updateTopic)

module.exports = router