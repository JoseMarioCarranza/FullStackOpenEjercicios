const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('No password');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Aperta:${password}@cluster0.ltyiwzz.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(r => {
        r.map(p => console.log(p))
        mongoose.connection.close()
    })
}