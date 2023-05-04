const express = require('express');
const router = express.Router()

// middlewares
const customMiddleware = (req, res, next) => {
  console.log("middleware executed!!")
  next()
}

// routes with middlewares
router.get('/', customMiddleware, (req, res) => {
  console.log('HOME ROUTE')
  res.send("hello world")
})

// routes w/o middlewares
router.get('/about', (req, res) => {
  console.log('ABOUT ROUTE')
  res.send("about page")
})

module.exports = router