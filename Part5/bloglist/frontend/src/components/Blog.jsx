import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, like }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const remove = async () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    const response = await blogService.remove(blog.id)

    if (response) {

      setBlogs(blogs.filter(b => b.id !== blog.id))

    }
  }

  const removeButton = () => {

    if (user.username === blog.user.username) {
      return (
        <div onClick={remove}>
          <button>remove</button>
        </div>
      )
    } else {
      return
    }

  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='shortContent'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='fullContent'>
        <div> {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => like(blog)}>Like</button></div>
        <div>{blog.user.username}</div>
        <>{removeButton()}</>
      </div>
    </div>
  )
}
export default Blog