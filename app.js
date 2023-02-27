const userRouter = require('./Routes/userRouter')
const topicRouter = require('./Routes/topicRouter')
const articleRouter = require('./Routes/articleRouter')
const commentRouter = require('./Routes/commentRouter')
const followersRoute = require('./Routes/followersRoute')
const globleErrorHandler = require('./Middlewares/errorMiddleware')

const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/user', userRouter)
app.use('/api/topic', topicRouter)
app.use('/api/article', articleRouter)
app.use('/api/comment', commentRouter)
app.use('/api/follow', followersRoute)

app.use(globleErrorHandler)

module.exports = app