const express = require('express');
const router = express.Router()
// mongoose & DB models
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

// middlewares
// will check if the JWT is valid/exists as a header
const requireLogin = require("../middleware/requireLogin")


router.get("/user/:id", async (req, res) => {
  try {
    // find user info associated with 'id'
    const oneUser = await User.findOne({ _id: req.params.id }).select("-password")

    // find all posts associated with user
    const userPosts = await Post.find({ postedBy: req.params.id }).populate("postedBy", "_id name")
    res.json({ oneUser, userPosts })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: "User or Posts not found" })
  }
})


module.exports = router;
