const express = require('express');
const router = express.Router()
// mongoose & DB models
const mongoose = require('mongoose')
const Post = mongoose.model("Post")

// middlewares
// will check if the JWT is valid/exists as a header
const requireLogin = require("../middleware/requireLogin")

// create a post
router.post("/createpost", requireLogin, async (req, res) => {
  try {
    // destructure title & body and validate
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(422).json({ error: "Please Enter All Required Fields" })
    }

    // hide password from response w/ undefined
    req.user.password = undefined;

    // create new post ASSOCIATING with user
    // user retrieved from 'Authorization' header with JWT
    const post = new Post({
      title, body, postedBy: req.user
    })

    // save post to DB & respond with post
    const savedPost = await post.save()
    res.json({ post: savedPost });

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;