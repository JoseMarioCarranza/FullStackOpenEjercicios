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

module.exports = { dummy, totalLikes, favoriteBlog }