const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('getting notes validation', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('id field is defined', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
        blogs.forEach(blog => {
            assert(blog.id)
        })
    })
})

describe('adding notes validation', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'New blog',
            author: 'Alice Johnson',
            url: 'http://example.com/new-blog',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

        const titles = response.body.map(blog => blog.title)
        assert(titles.includes(newBlog.title))
    })

    test('blog without likes property can be added. Likes will get default 0', async () => {
        const newBlog = {
            title: 'New blog without likes',
            author: 'Alex Sp',
            url: 'http://example.com/new-blog-no-likes'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

        const titles = response.body.map(blog => blog.title)
        assert(titles.includes(newBlog.title))

        assert(response.body.some(b =>
            b.title === newBlog.title &&
            b.author === newBlog.author &&
            b.url === newBlog.url &&
            b.likes === 0
        ))
    })

    test('blog without title or url properties, backend responds 400 ', async () => {
        const newBlogWithoutTitle = {
            author: 'Alex Sp',
            url: 'http://example.com/new-blog',
            likes: 10
        }
        const newBlogWithoutUrl = {
            title: 'New blog 2',
            author: 'Alex Sp',
            likes: 2
        }
        const newBlogWithoutTitleAndUrl = {
            author: 'Alex Sp',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(newBlogWithoutUrl)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitleAndUrl)
            .expect(400)
    })
})

describe('deleting a blog validation', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        const ids = blogsAtEnd.map(b => b.id)
        assert(!ids.includes(blogToDelete.id))
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
})

describe('altering a blog validation', () => {
    test('updating a post likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlogData = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlogData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
        
    })
})

after(async () => {
    await mongoose.connection.close()
})