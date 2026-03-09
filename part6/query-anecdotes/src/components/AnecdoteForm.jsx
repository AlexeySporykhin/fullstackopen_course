import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import NotificationContext from '../NotificationContext'

import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      notificationDispatch({ type: 'ADD', payload: data.content})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000);   
    },
    onError: () => {
      notificationDispatch({ type: 'POST_ERROR' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000);   
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
