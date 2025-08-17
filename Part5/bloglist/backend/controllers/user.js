const bcrypt = require('bcrypt')
const userRoutes = require('express').Router()
const User = require('../models/user')

userRoutes.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if (!username, !name, !password) {
        const err = new Error('Some data is missing')
        err.status = 400
        throw err
    }

    if (!(username.length > 3 && password.length > 3)) {
        const err = new Error('username or password invalid')
        err.status = 400
        throw err
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

userRoutes.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')

    res.status(200).json(users)
})

module.exports = userRoutes