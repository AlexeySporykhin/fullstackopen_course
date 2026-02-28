import { useState } from "react"

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogDetails = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}
        <button>like</button>
      </div>
      <div>{blog.user && blog.user.name}</div>
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