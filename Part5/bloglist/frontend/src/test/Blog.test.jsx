import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect } from 'vitest'

test('renders content', () => {
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

    let container

    container = render(<Blog blog={blog} user={user} />).container

    const title = screen.findByText('The blog of vitest')
    expect(title).toBeDefined()
    const author = screen.findByText('José Mario')
    expect(author).toBeDefined()

    const shortContent = container.querySelector('.shortContent')
    expect(shortContent).not.toHaveStyle('display: note')

    const fullContent = container.querySelector('.fullContent')
    expect(fullContent).toHaveStyle('display: none')

})