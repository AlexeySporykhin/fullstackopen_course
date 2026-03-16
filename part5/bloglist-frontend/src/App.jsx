import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createNotification, removeNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs, changeBlog, removeBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'

const App = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = useRef()

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
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <div>{user.name} logged in
        <button onClick={handleLogout}> logout </button>
      </div>
      <h2>create new </h2>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App