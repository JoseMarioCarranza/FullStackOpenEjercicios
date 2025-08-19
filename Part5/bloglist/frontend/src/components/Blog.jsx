import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {

  console.log(blog);

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
      </div>
    </div>
  )
}
export default Blog