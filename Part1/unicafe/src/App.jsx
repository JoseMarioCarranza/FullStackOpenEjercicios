import { useState } from "react"

const RateButton = ({
  variable,
  setState,
  text,
  totalVotes,
  setTotalVotes }) => {

  const update = () => {
    setState(variable + 1)
    setTotalVotes(totalVotes + 1)
  }

  return (
    <button onClick={update}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, totalVotes }) => (
  <div>
    <h1>statistics</h1>
    <p>good: {good}</p>
    <p>neutral: {neutral}</p>
    <p>bad: {bad}</p>
    <p>all: {totalVotes}</p>
    <p>average: {totalVotes == 0
      ? 'Waiting for display'
      : (good - bad) / totalVotes}
    </p>
    <p>positive: {totalVotes == 0
      ? 'Waiting for display' :
      (good / totalVotes) * 100} %
    </p>
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)

  return (
    <div>
      <h1>give feed back</h1>
      <RateButton
        totalVotes={totalVotes}
        setTotalVotes={setTotalVotes}
        variable={good}
        setState={setGood}
        text='good'
      />
      <RateButton
        totalVotes={totalVotes}
        setTotalVotes={setTotalVotes}
        variable={neutral}
        setState={setNeutral}
        text='neutral'
      />
      <RateButton
        totalVotes={totalVotes}
        setTotalVotes={setTotalVotes}
        variable={bad}
        setState={setBad}
        text='bad'
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalVotes={totalVotes}
      />
    </div>
  )
}

export default App