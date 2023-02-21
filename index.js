const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.MONGO_URI

mongoose.set('strictQuery', true)
mongoose
    .connect(DB, {})
    .then(() => {
        console.log('MongoDB Cluster Connected')
    })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})