const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const api = supertest(app)

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

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('id field is defined', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(blog => {
        assert(blog.id)
    })
})

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
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

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
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

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

after(async () => {
    await mongoose.connection.close()
})