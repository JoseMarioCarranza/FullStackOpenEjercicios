const { test, beforeEach, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const assert = require('assert')

const api = supertest(app)

const intialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

let authHeader

const createUserAndLogin = async () => {
    const username = 'user'
    const name = 'name'
    const password = 'password'

    await api
        .post('/api/users')
        .send({ username, name, password })
        .expect(201)

    const login = await api
        .post('/api/login')
        .send({ username, password })
        .expect(201)

    authHeader = { Authorization: `Bearer ${login.body.token}` }
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await createUserAndLogin()

    for (const b of intialBlogs) {
        await api.post('/api/blogs').set(authHeader).send(b).expect(201)
    }
})

test('the same number of initial blogs is the same number of blogs in the data base', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(intialBlogs.length, response.body.length)
})

test('The identifier property is id and not id', async () => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]

    assert(blog.id)

    assert(!blog._id)
})

test('You can post a new blog in the db', async () => {
    const newBlog = {
        title: "New Phones",
        author: "Roman Telefonitos",
        url: "https://www.romanphones.com/",
        likes: 100
    }

    await api
        .post('/api/blogs')
        .set(authHeader)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = await api.get('/api/blogs')

    const contents = blogsInDb.body.map(blog => blog.title)

    assert.strictEqual(contents.length, intialBlogs.length + 1)

    assert(contents.includes(newBlog.title))
})

test('If you post a new blog post with no likes defined, it will automatically be set to 0 likes', async () => {
    const newBlog = {
        title: "New Phones",
        author: "Roman Telefonitos",
        url: "https://www.romanphones.com/",
    }

    const savedBlog = await api
        .post('/api/blogs')
        .set(authHeader)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(savedBlog.body.likes, 0)
})

test('If you send a blog without a title or url it is going to send err 400 bad request', async () => {
    const newBlogsArray = [{
        author: "Roman Telefonitos",
        url: "https://www.romanphones.com/",
    }, {
        title: "New Phones",
        author: "Roman Telefonitos",
    }]

    await api
        .post('/api/blogs')
        .set(authHeader)
        .send(newBlogsArray[0])
        .expect(400)

    await api
        .post('/api/blogs')
        .set(authHeader)
        .send(newBlogsArray[1])
        .expect(400)

})

test('You can delete a blog in the data base', async () => {
    const blogsAtBegining = await api.get('/api/blogs')

    const blog = blogsAtBegining.body[0]

    await api
        .delete(`/api/blogs/${blog.id}`)
        .set(authHeader)
        .expect(204)

    const responseAtTheEnd = await api.get('/api/blogs')

    const blogsAtTheEnd = responseAtTheEnd.body.map(blog => blog.id)

    assert(!blogsAtTheEnd.includes(blog.id))
})

test('You can update the number of likes of a blog', async () => {
    const responseAtInit = await api.get('/api/blogs')

    const blog = responseAtInit.body[0]

    const updatedBlog = await api
        .put(`/api/blogs/${blog.id}`)
        .send({ likes: 999 })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(updatedBlog.body.likes, 999)
})

test("You can't create an invalid user", async () => {

    const user1 = {
        "username": "dn",
        "name": "Enos",
        "password": "123456"
    }

    const user2 = {
        "username": "dnbsdajhna",
        "name": "Enos",
        "password": "12"
    }

    const savedUser1 = await api
        .post(`/api/users`)
        .set(authHeader)
        .send(user1)
        .expect(400)

    const savedUser2 = await api
        .post(`/api/users`)
        .set(authHeader)
        .send(user2)
        .expect(400)

    assert(!savedUser1.body.id)

    assert(!savedUser2.body.id)
})

test("If you want to post a blog without a bearer token it will give you 401", async () => {
    const newBlog = {
        title: "New Phones",
        author: "Roman Telefonitos",
        url: "https://www.romanphones.com/",
        likes: 100
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})