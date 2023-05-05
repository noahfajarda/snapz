const express = require('express');
const router = express.Router()
// mongoose & DB models
const mongoose = require('mongoose')
const User = mongoose.model("User")
// 'bcrypt' for password encryption
const bcrypt = require('bcrypt')
// 'jwt' for login token
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../keys")

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

    // hash password with 'bcrypt'
    const hashedpassword = await bcrypt.hash(password, 15)

    // insert user into DB w/ hashed password & save
    const newUser = new User({
      email, password: hashedpassword, name
    })
    await newUser.save()
    res.json({ message: "Saved Successfully" })

  } catch (err) {
    console.log(err)
  }
})

// login route
router.post("/login", async (req, res) => {
  // destructure req.body properties
  const { email, password } = req.body

  // check for valid fields
  if (!email || !password) {
    // if not respond with an error status code & an error
    return res.status(422).json({ error: "Please Make An Entry For Both Email & Password" })
  }

  try {
    // find an existing user with the specified email
    const savedUser = await User.findOne({ email })
    if (!savedUser) return res.status(422).json({ error: "Invalid Email or Password" })

    // compare user-entered password to DB password
    const matchedEncryptedPassword = await bcrypt.compare(password, savedUser.password)

    if (matchedEncryptedPassword) {
      // create a JWT for login & send if successful
      const JWToken = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
      return res.json({ JWToken })
    }
    return res.status(422).json({ error: "Invalid Email or Password" })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router