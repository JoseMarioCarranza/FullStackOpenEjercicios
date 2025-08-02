import { useState, useEffect } from 'react'

import personsServices from './services/persons'

import Contact from './Components/Contact/Contact'
import PersonForm from './Components/PersonForm/PersonForm'
import Filter from './Components/Filter/Filter'
import Notification from './Components/Notification/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

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
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} notificationType={notificationType} />
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
        setNotificationMessage={setNotificationMessage}
        setNotificationType={setNotificationType}
      />
      <h2>Numbers</h2>
      {personsToShow.map(p =>
        <Contact
          key={p.id}
          person={p}
          setPersons={setPersons}
          persons={persons}
        />
      )}
    </div>
  )
}

export default App