const express = require('express');
const app = express()
const mongoose = require('mongoose')
const PORT = 3001
const { MONGOURI } = require('./keys')

// import mongoose DB models
require('./models/user')
// allow routes to read JSON data
app.use(express.json())
// import routes as middleware
app.use(require("./routes/auth"))


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


// run server
app.listen(PORT, () => {
  console.log("server is running on", PORT)
  console.log(`Visit http://localhost:${PORT} to view`)
})