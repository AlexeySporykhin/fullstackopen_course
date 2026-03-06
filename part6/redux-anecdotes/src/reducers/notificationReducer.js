import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationSet(state, action) {
            const message = action.payload
            return message
        },
        notificationRemove() {
            return ''
        }
    }
})

const { notificationSet, notificationRemove } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(notificationSet(message))
        setTimeout(() => {
            dispatch(notificationRemove())
        }, time * 1000)
    }
}
export default notificationSlice.reducer