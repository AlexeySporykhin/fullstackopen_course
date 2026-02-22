const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
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


