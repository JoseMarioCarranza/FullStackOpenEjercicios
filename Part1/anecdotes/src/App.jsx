import { useState } from 'react'

const Display = ({ tittle, anecdotes, selected, votes }) => (
  <>
    <h1>{tittle}</h1>
    {anecdotes[selected]}
    < p > has {votes[selected]} votes</p>
  </>
)

const RandomButton = ({ setState, array, selected }) => {

  const randomNumber = () => {
    let random = Math.floor(Math.random() * array.length)

    if (random === selected) {
      random = randomNumber()
    }

    return random
  }

  return (
    <button onClick={() => setState(randomNumber)}>
      next anecdote
    </button>
  )
}

const VoteButton = ({
  selected,
  setVotes,
  votes,
  setMorevotes,
  moreVotes,
  setMorePopular
}) => {

  const handleClick = () => {
    console.log('Has votado por ', { selected })
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)

    if (copyVotes[selected] >= moreVotes) {
      setMorevotes(moreVotes + 1)
      setMorePopular(selected)
    }
  }

  return (
    <button onClick={handleClick}>
      vote
    </button>
  )
}

const MorePopular = ({ anecdotes, morePopular, votes, moreVotes }) => {

  if (moreVotes === 0) return

  return (
    <Display
      tittle='Anecdote with most votes'
      anecdotes={anecdotes}
      selected={morePopular}
      votes={votes}
    />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [moreVotes, setMorevotes] = useState(0)
  const [morePopular, setMorePopular] = useState(0)

  return (
    <div>
      <Display
        tittle='Anecdote of the day'
        anecdotes={anecdotes}
        selected={selected}
        votes={votes}
      />
      <VoteButton
        selected={selected}
        setVotes={setVotes}
        votes={votes}
        setMorevotes={setMorevotes}
        moreVotes={moreVotes}
        setMorePopular={setMorePopular}
      />
      <RandomButton setState={setSelected} array={anecdotes} selected={selected} />
      <MorePopular anecdotes={anecdotes} morePopular={morePopular} votes={votes} moreVotes={moreVotes} />
    </div>
  )
}

export default App