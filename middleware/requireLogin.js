const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../keys")
// import DB models
const mongoose = require('mongoose')
const User = mongoose.model("User")

// middleware to check if logged in for protected route
module.exports = function requireLogin(req, res, next) {

  // destructure 'authorization' & check for value
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({ error: "You Must Be Logged In!" })
  }

  // isolate the token and verify
  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    // error if JWT is invalid
    if (err) return res.status(401).json({ error: "You Must Be Logged In!" })

    // if JWT is valid
    const { _id } = payload

    // find userData by id
    User.findById(_id).then(userData => {
      // attatch the user data to the request
      req.user = userData
    })

    // continue
    next()
  })


}