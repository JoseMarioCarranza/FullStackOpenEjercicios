require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
const person = require('./models/person')

const app = express()

const errorHandler = (error, req, res, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(cors())
app.use(express.static('../frontend/dist'))

morgan.token('body', function getId(req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status -:response-time ms :body'))

app.use(express.json())

app.get('/info', (req, res) => {

    Person.find({}).then(people => {
        res.send(`
        <p>Phonebook has info for ${people.length} people</p>
        <p>${Date()}<p/>
        `)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => res.json(people))
})

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body

    const person = new Person({
        "name": name,
        "number": number
    })

    person.save()
        .then(savePerson => res.json(savePerson))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    Person.findByIdAndDelete(id)
        .then(r => res.status(204).end())
        .catch(e => next(e))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})