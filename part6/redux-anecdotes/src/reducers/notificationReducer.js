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

export const { notificationSet, notificationRemove } = notificationSlice.actions
export default notificationSlice.reducer