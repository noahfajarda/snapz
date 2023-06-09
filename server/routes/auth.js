const express = require('express');
const router = express.Router()
// mongoose & DB models
const mongoose = require('mongoose')
const User = mongoose.model("User")
// 'bcrypt' for password encryption
const bcrypt = require('bcrypt')
// 'jwt' for login token
const jwt = require('jsonwebtoken')
const { JWT_SECRET, NODEMAILER_PASS } = require("../config/keys")
// nodemailer to send emails
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// transporter setup for nodemailer, setup email to send from
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    // https://support.microsoft.com/en-us/office/add-or-remove-an-email-alias-in-outlook-com-459b1989-356d-40fa-a689-8f285b13f1f2
    // this is an alias for 'noahfajarda@outlook.com'
    // go to the link above to change it
    user: "instagram-clone-name@outlook.com",
    pass: NODEMAILER_PASS
  }
})

// signup route
router.post("/signup", async (req, res) => {
  // destructure req.body properties
  const { name, email, password, profilePicURL } = req.body

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
      email, password: hashedpassword, name, profilePicURL
    })
    await newUser.save()

    // send an email to user that account has been saved successfully
    transporter.sendMail({
      from: "instagram-clone-name@outlook.com",
      to: email,
      subject: "Sending email with node.js!",
      html: `<h1>Welcome To Instagram ${name}!</h1>
      <br/>
      <br/>
      <p>We hope you enjoy using our platform!</p>
      <br/>
      <p>Sincerely, Snapz Team</p>
      `, // html body
    })

    res.json({ message: "Saved Successfully. You Can Now Log In And Check Your Email For A Welcome Message!" })

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
      const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
      // extract id, name, & email from 'savedUser' to pass through
      const { _id, name, email, followers, following, profilePicURL } = savedUser;
      return res.json({ token, user: { _id, name, email, followers, following, profilePicURL } })
    }
    return res.status(422).json({ error: "Invalid Email or Password" })
  } catch (err) {
    console.log(err)
  }
})

// reset password route
router.post("/reset-password", (req, res) => {
  // generate unique token with 'crypto'
  crypto.randomBytes(32, async (err, buffer) => {
    try {
      // retrieve token as 'hexidecimal' and convert to 'string'
      const token = buffer.toString("hex")

      // find a user that matches the user inputted email
      const user = await User.findOne({ email: req.body.email })

      // invalid email error handling
      if (!user) return res.status(422).json({ error: "No User Exists With That Email" })

      // set token & expiration (token expires in 1 hour, then resave user)
      user.resetToken = token;
      user.expireToken = Date.now() + 3600 * 1000
      await user.save()

      // send email to reset password, then respond with successful message
      transporter.sendMail({
        to: user.email,
        from: "instagram-clone-name@outlook.com",
        subject: "password reset",
        html: `
          <p>You requested for password reset. It's cool</p>
          <h5>Click on this <a href="https://new-social-media.herokuapp.com/reset/${token}">link</a> to reset password</h5>
        `
      })
      res.json({ message: "Check Your Email" })

    } catch {
      console.log(err)
      return
    }
  })
})

router.post("/new-password", async (req, res) => {
  try {
    // extract new password and token from body
    const newPassword = req.body.password
    const sentToken = req.body.token

    // find user based on token & return an error otherwise
    const userToUpdatePass = await User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })

    if (!userToUpdatePass) return res.status(422).json({ error: "Try Again " })

    // hash the new password and set it, remove token information
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    userToUpdatePass.password = hashedPassword;
    userToUpdatePass.resetToken = undefined;
    userToUpdatePass.expireToken = undefined;

    // save new user info
    await userToUpdatePass.save()
    res.json({ message: "Password Successfully Updated" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router