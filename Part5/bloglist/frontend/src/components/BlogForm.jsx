import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ blogs, setBlogs, setNotificationMessage, toggleVisibility }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = async event => {
        event.preventDefault()

        const newBlog = await blogService.create({ title, author, url })

        if (newBlog) {
            setNotificationMessage([`a new blog ${title} by ${author} added`, 'green'])

            toggleVisibility()

            setTitle('')
            setAuthor('')
            setUrl('')
            setBlogs(blogs.concat(newBlog))

            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        }
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default BlogForm