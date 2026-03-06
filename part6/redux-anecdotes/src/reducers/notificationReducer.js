import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'notification message',
    reducers: {
        notificationChange(state, action) {
            const message = action.payload
            return message
        }
    }
})

export const {notificationChange} = notificationSlice.actions
export default notificationSlice.reducer