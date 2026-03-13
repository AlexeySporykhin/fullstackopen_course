const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.payload
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const createNotification = (message) => {
  return { type: 'SET_NOTIFICATION',  payload: message }
}

export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' }
}
export default notificationReducer