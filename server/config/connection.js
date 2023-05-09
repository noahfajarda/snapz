const mongoose = require('mongoose')
const { MONGOURI } = require('../keys')

// mongoDB connection
mongoose.connect(MONGOURI, {
  // pass these options to remove deprecation warning
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  console.log("connected to mongo")
})
mongoose.connection.on('error', (err) => {
  console.log("error connecting!")
})

module.exports = mongoose.connection