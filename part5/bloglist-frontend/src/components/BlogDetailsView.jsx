import {
  Box,
  Button,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material'
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
    <Box className="blogDetails">
      <Stack spacing={2}>
        <Typography variant="h5">
          {blog.title} {blog.author}
        </Typography>
        <Link href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </Link>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{blog.likes} likes</Typography>
          <Button size="small" variant="outlined" onClick={handleLike}>
            like
          </Button>
        </Stack>
        <Typography variant="body2">
          added by {blog.user && blog.user.name}
        </Typography>
        {blog.user && blog.user.username === user.username && (
          <Button color="error" variant="outlined" onClick={handleRemove}>
            remove
          </Button>
        )}
        <Divider />
        <Typography variant="h6">comments</Typography>
        <Stack
          component="form"
          onSubmit={handleComment}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
        >
          <TextField
            type="text"
            placeholder="write a comment..."
            value={inputComment}
            onChange={({ target }) => setInputComment(target.value)}
            size="small"
            fullWidth
          />
          <Button type="submit" variant="contained">
            add comment
          </Button>
        </Stack>
        <List dense>
          {blog.comments.map((comment, index) => (
            <ListItem key={`${comment}-${index}`} disableGutters>
              <ListItemText primary={comment} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  )
}

export default BlogDetailsView