import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import {ErrorNotification, SuccessNotification} from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

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
      setMessage(`${user.name} successfully logged`);
      setTimeout(() => setMessage(null) , 5000);
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setMessage(`${user.name} successfully logouted`);
    setTimeout(()=> setMessage(null), 5000);
    blogService.setToken(null);
    setUser(null);
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

  const addBlog = async event => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url
    }
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setAuthor('');
    setTitle('');
    setUrl('');
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
    setTimeout(() => setMessage(null), 5000);
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={message} />
      <ErrorNotification message={errorMessage} />
      <div>{user.name} logged in
        <button onClick={handleLogout}> logout </button>
      </div>
      <h2>create new </h2>
      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App