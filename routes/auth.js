const express = require('express');
const router = express.Router()
// mongoose & DB models
const mongoose = require('mongoose')
const User = mongoose.model("User")

// different types of responses:
// res.send(), res.json()

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

// signup route
router.post("/signup", async (req, res) => {
  // destructure req.body properties
  const { name, email, password } = req.body

  // check for valid fields
  if (!name || !email || !password) {
    // if not respond with an error status code & an error
    return res.status(400).json({ error: "Please Make An Entry For All Of Name, Email, & Password" })
  }

  try {
    // check if user exists already
    const savedUser = await User.findOne({ email })
    if (savedUser) { return res.status(422).json({ error: "That Username Already Exists" }) }

    // insert user into DB
    const newUser = new User({
      email, password, name
    })
    await newUser.save()
    res.json({ message: "Saved Successfully" })

  } catch (err) {
    console.log(err)
  }
})

module.exports = router