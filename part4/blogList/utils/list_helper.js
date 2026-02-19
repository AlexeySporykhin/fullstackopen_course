const countBy = require("lodash/countBy");
const mapValues = require("lodash/mapValues");
const groupBy = require("lodash/groupBy");
const sumBy = require("lodash/sumBy");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce(
        (accumulator, currentValue) => {
            return accumulator + currentValue
        },
        0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    return blogs.reduce((currentFavoriteBlog, currentBlog) => {
        return currentBlog.likes <= currentFavoriteBlog.likes ? currentFavoriteBlog : currentBlog
    }, blogs[0])
}

    
const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
    const cntBlogsByAuthor = countBy(blogs, 'author')
    const maxBlogsAuthor = Object.entries(cntBlogsByAuthor).reduce((currMaxAuthor, currAuthor) => {
        blogCountByCurrAuthor = currAuthor[1];
        blogCountByCurrMaxAuthor = currMaxAuthor[1];
        return blogCountByCurrAuthor > blogCountByCurrMaxAuthor ? currAuthor : currMaxAuthor
    })
    return {
        author: maxBlogsAuthor[0],
        blogs: maxBlogsAuthor[1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;
    const groupedByAuthor = groupBy(blogs, 'author');
    const likesByAuthor = mapValues(groupedByAuthor, authorBlogs => sumBy(authorBlogs, 'likes'));
    const maxLikesAuthor = Object.entries(likesByAuthor).reduce((currMaxAuthor, currAuthor) => {
        likesByCurrAuthor = currAuthor[1];
        likesByCurrMaxAuthor = currMaxAuthor[1];
        return likesByCurrAuthor > likesByCurrMaxAuthor ? currAuthor : currMaxAuthor
    })
    return {
        author: maxLikesAuthor[0],
        likes: maxLikesAuthor[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}