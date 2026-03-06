import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationSet, notificationRemove } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        return filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)
    })

    return (
        <div>
            {
                anecdotes.map(anecdote => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => {
                            dispatch(voteAnecdote(anecdote))
                            dispatch(notificationSet(`you voted for '${anecdote.content}'`))
                            setTimeout(() => {
                                dispatch(notificationRemove())
                            }, 5000)
                        }}
                    />
                ))
            }
        </div>
    )
}

export default AnecdoteList
