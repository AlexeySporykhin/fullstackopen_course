import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    handleVote(state, action) {
      const id = action.payload
      console.log('id', id)

      const anecdoteToChange = state.find(an => an.id === id)
      console.log('anecdoteToChange', current(anecdoteToChange))
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      console.log(current(state))
      return state.map(an => (an.id !== id ? an : changedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { handleVote } = anecdoteSlice.actions

export default anecdoteSlice.reducer
