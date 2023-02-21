const express = require('express')
const userRouter = require('./Routes/userRouter')
const topicRouter = require('./Routes/topicRouter')
const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/topic', topicRouter)

module.exports = app