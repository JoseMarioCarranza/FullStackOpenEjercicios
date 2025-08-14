const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRoutes.post('/', middleware.userExtractor, async (request, response) => {

    const { title, author, url, likes } = request.body

    if (!request.user) {
        const err = new Error('token invalid')
        err.status = 401
        throw err
    }

    const user = await User.findById(request.user.id)

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

blogsRoutes.delete('/:id', middleware.userExtractor, async (request, response) => {

    if (!request.token) {
        const err = new Error('No sing user')
        err.status = 401
        throw err
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        const err = new Error('Blog no found')
        err.status = 401
        throw err
    }

    const userId = request.user.id

    if (blog.user.toString() === userId.toString()) {
        await Blog.deleteOne(blog)
    } else {
        const err = new Error("This blog doesn't belong to this user")
        err.status = 401
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