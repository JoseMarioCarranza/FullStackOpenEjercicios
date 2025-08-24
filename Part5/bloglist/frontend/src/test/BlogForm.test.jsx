import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import { useState } from 'react'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', async () => {

    let blog

    function TestWraper() {
        const [title, setTitle] = useState('')
        const [author, setAuthor] = useState('')
        const [url, setUrl] = useState('')

        const createBlog = () => {


            blog = { title, author, url }


            setTitle('')
            setAuthor('')
            setUrl('')
        }

        return (<BlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            createBlog={createBlog}
        />)
    }

    beforeEach(() => {
        blog = null
        render(<TestWraper />)
    })

    test('should first', async () => {
        const inputs = screen.getAllByRole('textbox')

        const user = userEvent.setup()

        await user.type(inputs[0], 'This is a test')
        await user.type(inputs[1], 'Testing man')
        await user.type(inputs[2], 'www.test.com')

        const button = screen.getByText('create')
        await user.click(button)

        expect(blog).toStrictEqual({
            title: 'This is a test',
            author: 'Testing man',
            url: 'www.test.com',
        })
    })
})