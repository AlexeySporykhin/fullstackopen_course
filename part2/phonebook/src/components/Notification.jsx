export const SuccessNotification = ({message}) => { 
    if (!message) return;
    return <div className="successedAction">{message}</div>
 }
export const ErrorNotification = ({message}) => { 
    if (!message) return;
    return <div className="error">{message}</div>
 }
 export default {SuccessNotification, ErrorNotification};