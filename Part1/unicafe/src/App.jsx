import { useState } from "react"

const RateButton = ({ variable, setState, text }) => (
  <button onClick={() => setState(variable + 1)}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => (
  <div>
    <h1>statistics</h1>
    <p>good: {good}</p>
    <p>neutral: {neutral}</p>
    <p>bad: {bad}</p>
  </div>
)

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feed back</h1>
      <RateButton
        variable={good}
        setState={setGood}
        text='good'
      />
      <RateButton
        variable={neutral}
        setState={setNeutral}
        text='neutral'
      />
      <RateButton
        variable={bad}
        setState={setBad}
        text='bad'
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App