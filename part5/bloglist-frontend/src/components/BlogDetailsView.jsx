import { useState } from 'react'

const BlogDetailsView = ({ blog, user, updateBlog, deleteBlog, addComment }) => {
  const [inputComment, setInputComment] = useState('')

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

  const handleComment = (event) => {
    event.preventDefault()
    addComment(blog.id, inputComment)
    setInputComment('')
  }

  if (!blog) return null

  return (
    <div className='blogDetails'>
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

        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input
            type = 'text'
            placeholder='write a comment...'
            value={inputComment}
            onChange={({ target }) => setInputComment(target.value)}
          />
          <button>add comment</button>
        </form>

        <ul>
          {blog.comments.map((comment, index) => (
            <li key={`${comment}-${index}`}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetailsView