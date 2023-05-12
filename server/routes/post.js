const express = require('express');
const router = express.Router()
// mongoose & DB models
const mongoose = require('mongoose')
const Post = mongoose.model("Post")

// middlewares
// will check if the JWT is valid/exists as a header
const requireLogin = require("../middleware/requireLogin")

// READ/GET all posts
router.get("/allposts", async (req, res) => {
  try {
    // populated 'postedBy' field based on foreign key
    // second param == fields to include
    const posts = await Post.find().populate("postedBy", "_id name")

    res.json({ posts })
  } catch (err) {
    console.error(err)
  }
})

// READ/GET all posts by USER (protected route)
router.get("/myposts", requireLogin, async (req, res) => {
  // will use the jwt to get the user's info
  // jwt will be converted to the 'user' object --> req.user
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")

    res.json({ myposts: posts })
  } catch (err) {
    console.error(err)
  }
})

// CREATE a post
router.post("/createpost", requireLogin, async (req, res) => {
  try {
    // destructure title, body, & image url and validate
    const { title, body, imageUrl } = req.body;
    if (!title || !body || !imageUrl) {
      return res.status(422).json({ error: "Please Enter All Required Fields" })
    }

    // hide password from response w/ undefined
    req.user.password = undefined;

    // create new post ASSOCIATING with user
    // user retrieved from 'Authorization' header with JWT
    const post = new Post({
      title, body, imageUrl, postedBy: req.user
    })

    // save post to DB & respond with post
    const savedPost = await post.save();
    res.json({ post: savedPost });

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;