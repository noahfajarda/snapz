const express = require('express');
const app = express()
const PORT = 3001
const db = require("./config/connection")

// import mongoose DB models
require('./models/user')
// allow routes to read JSON data
app.use(express.json())
// import routes as middleware
app.use(require("./routes/auth"))

// run server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log("server is running on", PORT)
    console.log(`Visit http://localhost:${PORT} to view`)
  })
})