import { useSelector, useDispatch } from 'react-redux'
import { handleVote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state.toSorted((a, b) => b.votes - a.votes))

    return (
        <div>
            {
                anecdotes.map(anecdote => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => dispatch(handleVote(anecdote.id))}
                    />
                ))
            }
        </div>
    )
}

export default AnecdoteList
