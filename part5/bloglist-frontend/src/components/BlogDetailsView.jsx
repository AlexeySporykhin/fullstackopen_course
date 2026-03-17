const BlogDetailsView = ({ blog, updateBlog, deleteBlog, user }) => {
  if (!blog) return null

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
      <h2>{blog.title} {blog.author}</h2>
      <div> <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a></div>
      <div >{blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div> added by {blog.user && blog.user.name}</div>
      {blog.user && blog.user.username === user.username
        && <div><button onClick={handleRemove}>remove</button></div>}
    </div>
  )

  return (
    <div className='blogDetails'>
      {blogDetails()}
    </div>
  )
}

export default BlogDetailsView