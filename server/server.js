const express = require('express');
const app = express()
const PORT = process.env.PORT || 3001
const db = require("./config/connection")
// path for deployment
const path = require('path')

// import mongoose DB models
require('./models/User')
require('./models/Post')
// allow routes to read JSON data
app.use(express.json())
// import routes as middleware
app.use(require("./routes"))

if (process.env.NODE_ENV == 'production') {
  // serve the static HTML file
  app.use(express.static("client/build"))
  // ANY requests client will make will be forwarded to the build -> "index.html"
  // all react routes will be in index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"))
  })
}

// run server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log("server is running on", PORT)
    console.log(`Visit http://localhost:${PORT} to view`)
  })
})