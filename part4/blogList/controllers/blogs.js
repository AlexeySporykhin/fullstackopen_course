const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end()
  }
  if (!request.token) {
    return response.status(401).json({ error: 'without a token' })
  } 
  
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'without a token' })
  }
  
  const user = request.user;
  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }
  
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(401).json({ error: 'the blog doesnt exist' })
  }

  if (user._id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'user invalid' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findById(request.params.id)
  if (!updatedBlog) {
    return response.status(404).end()
  }

  updatedBlog.likes = request.body.likes || updatedBlog.likes
  const savedBlog = await updatedBlog.save()

  return response.status(200).json(savedBlog)
})

module.exports = blogsRouter


