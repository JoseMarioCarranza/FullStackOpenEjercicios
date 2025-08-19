import { useState } from 'react'
import blogService from '../services/blogs'
import Log from './log'

const Blog = ({ blog, blogs, setBlogs, user }) => {

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

  const like = async () => {
    blog.likes += 1
    const response = await blogService.update(blog)

    if (response) {
      setBlogs(blogs.map(b => b))
    }
  }

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
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div> {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button> </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={like}>Like</button></div>
        <div>{blog.user.username}</div>
        <>{removeButton()}</>
      </div>
    </div>
  )
}
export default Blog