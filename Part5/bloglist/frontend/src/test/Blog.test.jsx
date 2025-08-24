import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {

    let container
    let likeCounter = 0

    beforeEach(() => {
        const blog = {
            title: 'The blog of vitest',
            author: 'José Mario',
            url: 'www.ingjosemario.com',
            likes: '100',
            user: {
                username: 'Aperta'
            },
        }

        const user = {
            username: 'Aperta'
        }


        const like = () => {
            likeCounter += 1
        }

        container = render(<Blog blog={blog} user={user} like={() => like(blog)} />).container

    })

    test('shortContent test', () => {
        const title = screen.findByText('The blog of vitest')
        expect(title).toBeDefined()
        const author = screen.findByText('José Mario')
        expect(author).toBeDefined()

        const shortContent = container.querySelector('.shortContent')
        expect(shortContent).not.toHaveStyle('display: none')

        const fullContent = container.querySelector('.fullContent')
        expect(fullContent).toHaveStyle('display: none')
    })

    test('Full content test', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const title = screen.findByText('The blog of vitest')
        expect(title).toBeDefined()
        const author = screen.findByText('José Mario')
        expect(author).toBeDefined()
        const url = screen.findByText('www.ingjosemario.com')
        expect(url).toBeDefined()
        const likes = screen.findByText('100')
        expect(likes).toBeDefined()
        const username = screen.findByText('Aperta')
        expect(username).toBeDefined()

        const shortContent = container.querySelector('.shortContent')
        expect(shortContent).toHaveStyle('display: none')

        const fullContent = container.querySelector('.fullContent')
        expect(fullContent).not.toHaveStyle('display: none')
    })

    test('If you click on the like button two times it is going to show you intial likes + 2', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('view')
        const likeButton = screen.getByText('Like')
        await user.click(button)
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeCounter).toBe(2)
    })
})