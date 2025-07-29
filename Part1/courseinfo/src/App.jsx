const Header = ({ course }) => <h1> {course} </h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.name} part={part} />)}
    </>
  )
}

const Total = ({ parts }) => {

  const total = parts.reduce((t, p) => t + p.exercises, 0)

  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content
        parts={course.parts}
      />
      <Total parts={course.parts} />
    </div>
  )
}

export default App