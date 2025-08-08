const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`conecting to ${url}`);

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(r => console.log('Connected to MongoDB'))
    .catch(e => console.log(`conection error ${e.message}`))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d{5,}$/.test(v);
            }, message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObjet) => {
        returnedObjet.id = returnedObjet._id.toString()
        delete returnedObjet._id
        delete returnedObjet.__v
    }
})

module.exports = mongoose.model('Person', personSchema)