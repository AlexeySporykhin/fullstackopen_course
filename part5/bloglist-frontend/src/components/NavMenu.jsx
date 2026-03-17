import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NavMenu = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          blogs
        </Button>
        <Button color="inherit" component={RouterLink} to="/users">
          users
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ mr: 2 }}>
          {user.name} logged in
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavMenu
