export const ErrorNotification = ({message}) => {
    if (message === null) {
        return null
    }

    return <div className="error">{message}</div>
}
export const SuccessNotification = ({message}) => {
    if (message === null) {
        return null
    }

    return <div className="successedAction">{message}</div>
}



export default {ErrorNotification, SuccessNotification}