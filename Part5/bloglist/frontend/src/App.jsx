import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Log from './components/log'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogListApp')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogListApp')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const like = async (blog) => {
    blog.likes += 1
    const response = await blogService.update(blog)

    if (response) {
      setBlogs(blogs.map(b => b))
    }
  }

  const createBlog = async event => {
    event.preventDefault()

    const newBlog = await blogService.create({ title, author, url })

    if (newBlog) {
      setNotificationMessage([`a new blog ${title} by ${author} added`, 'green'])

      blogFormRef.current.toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <BlogForm
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        createBlog={createBlog}
      />
    </Togglable>
  )

  return (
    <>
      <Notification notificationMessage={notificationMessage} />
      {
        user === null

          ? <Log setUser={setUser} setNotificationMessage={setNotificationMessage} />
          : < div >

            <h2>blogs</h2>

            <div>
              {user.name} logged in
              <button onClick={logOut}>Log Out</button>
            </div>

            {blogForm()}

            <br />

            {
              blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  user={user}
                  like={like}
                />
              )
            }
          </div >
      }
    </>
  )
}

export default App