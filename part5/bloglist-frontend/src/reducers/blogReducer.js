import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload)
      state.sort((a, b) => b.likes - a.likes)
    },
    setBlogs: (state, action) => {
      return [...action.payload].sort((a, b) => b.likes - a.likes)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? { ...updatedBlog, user: blog.user } : blog)
    },
    deleteBlog: (state, action) => {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(blogObject)
    dispatch(appendBlog(returnedBlog))
  }
}

export const changeBlog = (id, newBlogObject) => {
  return async dispatch => {
    const returnedBlog = await blogService.update(id, newBlogObject)
    dispatch(updateBlog(returnedBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer