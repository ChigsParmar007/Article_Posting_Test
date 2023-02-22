const express = require('express')
const userRouter = require('./Routes/userRouter')
const topicRouter = require('./Routes/topicRouter')
const articleRouter = require('./Routes/articleRouter')
const commentRouter = require('./Routes/commentRouter')
const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/topic', topicRouter)
app.use('/api/article', articleRouter)
app.use('/api/comment', commentRouter)

module.exports = app