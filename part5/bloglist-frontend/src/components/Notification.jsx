import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification || !notification.message) {
    return null
  }

  return <div className={notification.type === 'error' ? 'error' : 'successedAction'}>{notification.message}</div>
}

export default Notification