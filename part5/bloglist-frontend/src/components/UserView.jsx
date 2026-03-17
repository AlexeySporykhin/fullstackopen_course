import { useParams } from 'react-router-dom'

const UserView = ({ blogs }) => {
  const { id } = useParams()
  const userBlogs = blogs.filter(blog => blog?.user?.id === id)
  const user = userBlogs[0]?.user
  return (
    <div>
      {user?.name && <h2>{user.name}</h2>   }
      <h3> added blogs </h3>
      <ul>
        {userBlogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView