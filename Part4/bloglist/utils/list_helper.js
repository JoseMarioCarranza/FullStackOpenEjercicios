const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return (blog.likes + sum)
    }, 0)
}

const favoriteBlog = (blogs) => {

    return blogs.reduce((MorePopular, blog) => {
        const result = MorePopular.likes < blog.likes
            ? blog
            : MorePopular

        return result
    }, blogs[0])
}

const mostBlogs = (blogs) => {

    const listOfAuthors = blogs.reduce((r, blog) => {

        const exist = r.find(b => b.author === blog.author)

        if (exist) {
            exist.blogs += 1

            r.map(b => {
                return b.author !== blog.author
                    ? b
                    : exist
            })

            return r

        } else {
            return r.concat({ author: blog.author, blogs: 1 })
        }
    }, [])

    const result = listOfAuthors.sort((a, b) => b.blogs - a.blogs)[0]

    return result

}

const blogs = [
    { title: 'Post A', author: 'Linus', likes: 5 },
    { title: 'Post B', author: 'Edsger W. Dijkstra', likes: 12 },
    { title: 'Post C', author: 'Grace Hopper', likes: 12 },
    { title: 'Post D', author: 'Margaret Hamilton', likes: 9 },
    { title: 'Post E', author: 'Margaret Hamilton', likes: 9 }
]

console.log(mostBlogs(blogs));

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }