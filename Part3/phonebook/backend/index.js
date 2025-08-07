require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.static('dist'))

morgan.token('body', function getId(req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status -:response-time ms :body'))

app.use(express.json())

app.get('/info', (req, res) => {
    res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}<p/>
    `)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => res.json(people))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) return res.status(400).json({ error: 'Some data is missing' })

    const person = new Person({
        "name": body.name,
        "number": String(body.number)
    })

    person.save().then(savePerson => res.json(savePerson))
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id

    Person.findById(id)
        .then(person => res.json(person))
        .catch(e => res.status(404).end())
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})