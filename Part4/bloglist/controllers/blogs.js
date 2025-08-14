const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRoutes.post('/', async (request, response) => {

    const { title, author, url, likes, userId } = request.body

    const user = await User.findById(userId)

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