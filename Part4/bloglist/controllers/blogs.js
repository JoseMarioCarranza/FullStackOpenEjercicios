const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')

blogsRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRoutes.post('/', async (request, response) => {

    const { title, author, url, likes } = request.body

    if (!title || !url) {
        const err = new Error('some data is missing')
        err.status = 400
        throw err
    }

    const blog = new Blog({
        'title': title,
        'author': author,
        'url': url,
        'likes': likes || 0
    })

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
})

module.exports = blogsRoutes