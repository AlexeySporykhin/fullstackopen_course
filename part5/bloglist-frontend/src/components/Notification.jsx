const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return <div className={notification.type === 'error' ? 'error' : 'successedAction'}>{notification.message}</div>
}

export default Notification