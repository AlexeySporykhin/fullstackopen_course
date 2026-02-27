const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'First blog',
        author: 'John Doe',
        url: 'http://example.com/first-blog',
        likes: 5
    },
    {
        title: 'Second blog',
        author: 'Jane Smith',
        url: 'http://example.com/second-blog',
        likes: 10
    }
]

const initialUsers = [
    {
        username: 'alexsp',
        name: 'Alex Sp',
        password: 'testtest'
    }
]


const nonExistingId = async () => {
    const blog = new Blog({
        title: 'Will be removed',
        author: 'Temp Author',
        url: 'http://example.com/temp-blog',
        likes: 0
    })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
    initialUsers
}