const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRoutes.post('/', async (request, response) => {

    const { title, author, url, likes } = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        const err = new Error('token invalid')
        err.status = 401
        throw err
    }

    const user = await User.findById(decodedToken.id)

    if (!title || !url) {
        const err = new Error('some data is missing')
        err.status = 400
        throw err
    }

    const blog = new Blog({
        'title': title,
        'author': author,
        'url': url,
        'likes': likes || 0,
        'user': user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRoutes.delete('/:id', async (request, response) => {

    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

    if (!deletedBlog) {
        const err = new Error('Id not found')
        err.status = 400
        throw err
    }

    response.status(204).end()
})

blogsRoutes.put('/:id', async (request, response) => {

    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true }
    )

    if (!updatedBlog) {
        const err = new Error('Id not found')
        err.status = 400
        throw err
    }

    response.status(200).json(updatedBlog)

})

module.exports = blogsRoutes