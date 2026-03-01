import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const blogDetails = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user && blog.user.name}</div>
      {/* {console.log('blog.user:', blog.user, 'user:', user)} */}
      {blog.user && blog.user.username === user.username
      && <div><button onClick={handleRemove}>remove</button></div>}
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
        <div style={showWhenVisible}>
          {blogDetails()}
        </div>
      </div>
    </div>
  )

}

export default Blog