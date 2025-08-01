import personsServices from "../../services/persons"

const Contact = ({ person, setPersons, persons }) => {

    const handleClick = () => {
        personsServices
            .trash(person.id)
            .then(r => {
                console.log(`person with id ${person.id} has been deleted`)
                setPersons(persons.filter(p => p.id !== person.id))
            })
    }

    return (
        <p>
            {person.name}: {person.number} <button onClick={handleClick}>Delete</button>
        </p>
    )
}

export default Contact