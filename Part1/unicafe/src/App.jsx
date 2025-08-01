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

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr >
)

const Statistics = ({ good, neutral, bad, totalVotes }) => {
  if (totalVotes === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='all' value={totalVotes} />
          <StatisticsLine text='average' value={(good - bad) / totalVotes} />
          <StatisticsLine text='positive' value={(((good / totalVotes) * 100)) + '%'} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)

  return (
    <>
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
    </>
  )
}

export default App