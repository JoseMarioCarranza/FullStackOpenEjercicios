import { useState, useEffect } from 'react'

import personsServices from './services/persons'

import Contact from './Components/Contact/Contact'
import PersonForm from './Components/PersonForm/PersonForm'
import Filter from './Components/Filter/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

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
      {personsToShow.map(p => <Contact key={p.id} person={p} setPersons={setPersons} persons={persons} />)}
    </div>
  )
}

export default App