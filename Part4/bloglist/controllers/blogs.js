const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')

blogsRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRoutes.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRoutes