import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Log from './components/log'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

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

            <br />

            <BlogForm blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} />

            <br />

            {
              blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )
            }
          </div >
      }
    </>
  )
}

export default App