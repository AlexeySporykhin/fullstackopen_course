import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state)
  if (!notification || !notification.message) {
    return null
  }

  return <div className={notification.type === 'error' ? 'error' : 'successedAction'}>{notification.message}</div>
}

export default Notification