const Header = ({ course }) => <h1> {course} </h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </>
    )
}

const Total = ({ parts }) => {

    const total = parts.reduce((t, p) => t + p.exercises, 0)

    return <p>Total of exercises {total}</p>
}

const Course = ({ course }) => (
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course