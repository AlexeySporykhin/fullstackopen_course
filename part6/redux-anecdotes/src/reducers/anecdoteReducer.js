import { createSlice, current } from '@reduxjs/toolkit'

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

export const { createAnecdote, handleVote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
