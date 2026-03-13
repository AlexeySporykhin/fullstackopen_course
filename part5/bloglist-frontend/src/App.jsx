import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { ErrorNotification, SuccessNotification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createNotification, removeNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch()
  const message = useSelector(state => state)

  console.log('message', message)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(createNotification(`${user.name} successfully logged`))
      setTimeout(() => dispatch(removeNotification()), 5000)
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(createNotification(`${user.name} successfully logouted`))
    setTimeout(() => dispatch(removeNotification()), 5000)
    blogService.setToken(null)
    setUser(null)
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
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat({ ...returnedBlog, user: user }))
    dispatch(createNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...returnedBlog, user: blog.user }))
      dispatch(createNotification('Liked a post'))
      setTimeout(() => dispatch(removeNotification()), 5000)
    } catch {
      setBlogs(blogs)
      dispatch(createNotification('User invalid. User must be creator of the blog'))
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  }

  const deleteBlog = async id => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      dispatch(createNotification('Blog has been deleted'))
      setTimeout(() => dispatch(removeNotification()), 5000)
    } catch {
      setBlogs(blogs)
      dispatch(createNotification('User invalid. User must be creator of the blog'))
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <SuccessNotification message={message} />
        <ErrorNotification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={message} />
      <ErrorNotification message={errorMessage} />
      <div>{user.name} logged in
        <button onClick={handleLogout}> logout </button>
      </div>
      <h2>create new </h2>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App