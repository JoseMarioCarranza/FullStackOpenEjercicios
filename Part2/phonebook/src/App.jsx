import { useState } from 'react'

import Contact from './Components/Contact/Contact'
import PersonForm from './Components/PersonForm/PersonForm'
import Filter from './Components/Filter/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = event => setNewFilter(event.target.value)

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      {personsToShow.map(p => <Contact key={p.name} person={p} />)}
    </div>
  )
}

export default App