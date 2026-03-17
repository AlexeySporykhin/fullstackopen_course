import { Link as RouterLink } from 'react-router-dom'
import { Link, Paper, Typography } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <Paper data-testid="blog" variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" className="blogTitle">
        <Link
          component={RouterLink}
          to={`/blogs/${blog.id}`}
          underline="hover"
          color="inherit"
        >
          {blog.title} {blog.author}
        </Link>
      </Typography>
    </Paper>
  )

}

export default Blog