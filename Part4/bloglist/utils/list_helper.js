const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return (blog.likes + sum)
    }, 0)
}

module.exports = { dummy, totalLikes }