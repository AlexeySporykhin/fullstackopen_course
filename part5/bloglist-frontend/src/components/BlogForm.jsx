import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    createBlog(blogObject)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <Stack component="form" onSubmit={addBlog} spacing={2}>
      <TextField
        label="title"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        placeholder="write title here"
      />
      <TextField
        label="author"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        placeholder="write author here"
      />
      <TextField
        label="url"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        placeholder="write url here"
      />
      <Button type="submit" variant="contained">
        create
      </Button>
    </Stack>
  )
}
export default BlogForm

