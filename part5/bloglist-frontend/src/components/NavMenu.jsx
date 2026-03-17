import { Link } from 'react-router-dom'

const NavMenu = ({ user, handleLogout }) => {
  const padding = {
    padding: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      {user.name} logged in
      <button onClick={handleLogout}> logout </button>
    </div>
  )
}

export default NavMenu
