const express = require('express')
const router = express.Router()
const { protect } = require('../Controllers/authController')
const { getAllTopics, createTopic, getTopicById, updateTopic, deleteTopic } = require('../Controllers/topicController')

router
    .route('/')
    .get(getAllTopics)

router
    .route('/:id')
    .get(getTopicById)

// Use a middleware to identify the user to perform below actions
router.use(protect)

router
    .route('/')
    .post(createTopic)

router
    .route('/:id')
    .patch(updateTopic)
    .delete(deleteTopic)

module.exports = router