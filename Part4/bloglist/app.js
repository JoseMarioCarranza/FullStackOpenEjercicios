const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRoutes = require('./controllers/blogs')
const userRoutes = require('./controllers/user')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', loginRouter)

module.exports = app