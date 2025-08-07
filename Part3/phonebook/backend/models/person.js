const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`conecting to ${url}`);

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(r => console.log('Connected to MongoDB'))
    .catch(e => console.log(`conection error ${e.message}`))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObjet) => {
        returnedObjet.id = returnedObjet._id.toString()
        delete returnedObjet._id
        delete returnedObjet.__v
    }
})

module.exports = mongoose.model('Person', personSchema)