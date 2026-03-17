import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import { createNotification, removeNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs, changeBlog, removeBlog, createComment } from './reducers/blogReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import { Routes, Route, useMatch } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogDetailsView from './components/BlogDetailsView'
import NavMenu from './components/NavMenu'

const App = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(createNotification({ message: `${user.name} successfully logged`, type: 'success' }))
    } catch {
      dispatch(createNotification({ message: 'wrong username or password', type: 'error' }))
    } finally {
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(createNotification({ message: `${user.name} successfully logouted`, type: 'success' }))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const loginForm = () => (
    <Box component="form" onSubmit={handleLogin}>
      <Stack spacing={2}>
        <TextField
          label="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" variant="contained">
          login
        </Button>
      </Stack>
    </Box>
  )

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    await dispatch(createBlog(blogObject))
    dispatch(createNotification({ message: `a new blog ${blogObject.title} by ${blogObject.author} added`, type: 'success' }))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const updateBlog = async (id, blogObject) => {
    try {
      await dispatch(changeBlog(id, blogObject))
      dispatch(createNotification({ message: 'Liked a post', type: 'success' }))
    } catch {
      dispatch(createNotification({ message: 'User invalid. User must be creator of the blog', type: 'error' }))
    } finally {
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  }

  const deleteBlog = async id => {
    try {
      await dispatch(removeBlog(id))
      dispatch(createNotification({ message: 'Blog has been deleted', type: 'success' }))
    } catch {
      dispatch(createNotification({ message: 'User invalid. User must be creator of the blog', type: 'error' }))
    } finally {
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  }

  const addComment = async (id, comment) => {
    try {
      await dispatch(createComment(id, comment))
      dispatch(createNotification({ message: `Added comment: ${comment} `, type: 'success' }))
    } catch {
      dispatch(createNotification({ message: 'User invalid. User must be creator of the blog', type: 'error' }))
    } finally {
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  }

  if (user === null) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h5">Log in to application</Typography>
            <Notification />
            {loginForm()}
          </Stack>
        </Paper>
      </Container>
    )
  }

  const Blogs = () => (
    <Stack spacing={2}>
      <Typography variant="h5">create new</Typography>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <Stack spacing={1.5}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </Stack>
    </Stack>
  )


  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavMenu user={user} handleLogout={handleLogout} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h4">blogs</Typography>
          <Notification />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<UsersView blogs={blogs} />} />
            <Route path="/user/:id" element={<UserView blogs={blogs} />} />
            <Route
              path="/blogs/:id"
              element={(
                <BlogDetailsView
                  blog={blog}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                  user={user}
                  addComment={addComment}
                />
              )}
            />
          </Routes>
        </Stack>
      </Container>
    </Box>
  )
}

export default App