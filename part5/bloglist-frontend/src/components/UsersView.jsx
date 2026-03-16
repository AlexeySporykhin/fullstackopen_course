import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead } from '@mui/material'

const UsersView = ({ blogs }) => {

  const usersStats = Object.values(
    blogs.reduce((accObj, blog) => {
      const user = blog?.user
      if (!user?.id) return accObj
      if (!accObj[user.id]) {
        accObj[user.id] = {
          id: user.id,
          name: user.name,
          createdBlogs: 0
        }
      }
      accObj[user.id].createdBlogs += 1
      return accObj
    }, {})
  )

  return (
    <div>
      <h2>Users</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><b>blogs created</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersStats.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.createdBlogs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersView