import personsServices from "../../services/persons"

const PersonForm = ({
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    persons,
    setPersons,
    setNotificationMessage,
    setNotificationType }) => {

    const handleSubmit = event => {
        event.preventDefault()

        const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

        if (existingPerson) {
            if (!window.confirm(`${newName}is already added to phonebook, replace the old number with a new one?`)) return

            const updateForPerson = { ...existingPerson, number: newNumber }

            personsServices
                .update(existingPerson.id, updateForPerson)
                .then(updatedPerson => {
                    setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setNotificationMessage(`Information of ${newName} has already been removed from server`)
                    setNotificationType('red')

                    setPersons(persons.filter(p => p.id !== existingPerson.id))

                    setTimeout(() => {
                        setNotificationMessage(null)
                        setNotificationType('')
                        setNewName('')
                        setNewNumber('')
                    }, 5000)

                })

            return

        }

        const personObject = {
            name: newName,
            number: newNumber,
            id: String(persons.length + 1)
        }

        personsServices
            .create(personObject)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNotificationMessage(`Added ${newName}`)
                setNotificationType('green')
                setNewName('')
                setNewNumber('')

                setTimeout(() => {
                    setNotificationMessage(null)
                    setNotificationType('')
                }, 5000)
            })
    }

    const handleNameChange = event => setNewName(event.target.value)
    const handleNumberChange = event => setNewNumber(event.target.value)

    return (
        <>
            <h2>add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>name: <input value={newName} onChange={handleNameChange} /></p>
                    <p>number: <input value={newNumber} onChange={handleNumberChange} /></p>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}


export default PersonForm