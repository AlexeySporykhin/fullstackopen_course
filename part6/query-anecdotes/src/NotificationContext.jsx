import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    const content = action.payload
    switch (action.type) {
        case 'ADD':
            return `anecdote '${content}' added`
        case 'VOTE':            
            return `anecdote '${content}' voted`
        case 'CLEAR':
            return ''
        case 'POST_ERROR':
            return 'too short anecdote, must have length 5 or more'
        default:
            return ''
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext