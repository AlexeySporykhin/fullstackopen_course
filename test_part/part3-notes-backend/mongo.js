const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://alexeysporykhin_db_user:${password}@cluster0.q3jthc7.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const notes = [
  { content: 'HTML is easy', important: true },
  { content: 'Browser can execute only JavaScript', important: true },
  { content: 'MongoDB is a NoSQL database', important: false },
  { content: 'REST APIs use HTTP methods', important: true },
]

// Note.insertMany(notes).then(result => {
//   console.log(`saved ${result.length} notes`);
//   mongoose.connection.close()
// })

Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})