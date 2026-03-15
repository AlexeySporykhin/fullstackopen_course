import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload
      return userData
    }
  }
})

const { setUser } = userSlice.actions

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const userData = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(userData)
    )
    blogService.setToken(userData.token)
    dispatch(setUser(userData))
    return userData
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}


export default userSlice.reducer