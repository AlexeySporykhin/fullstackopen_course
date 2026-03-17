import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification || !notification.message) {
    return null
  }

  return (
    <Alert severity={notification.type === 'error' ? 'error' : 'success'}>
      {notification.message}
    </Alert>
  )
}

export default Notification