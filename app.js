const express = require('express')
const userRouter = require('./Routes/userRouter')
const topicRouter = require('./Routes/topicRouter')
const articleRouter = require('./Routes/articleRouter')
const commentRouter = require('./Routes/commentRouter')
const followersRoute = require('./Routes/followersRoute')
const app = express()

app.use(express.json())

// const test  {
//     console.log('test')
// })

app.use('/api/user', userRouter)
app.use('/api/topic', topicRouter)
app.use('/api/article', articleRouter)
app.use('/api/comment', commentRouter)
app.use('/api/follow', followersRoute)

module.exports = app