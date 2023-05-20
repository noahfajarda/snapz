const express = require('express');
const router = express.Router()
// mongoose & DB models
const mongoose = require('mongoose')
const Post = mongoose.model("Post")

// middlewares
// will check if the JWT is valid/exists as a header
const requireLogin = require("../middleware/requireLogin")

// READ/GET all posts
router.get("/allposts", requireLogin, async (req, res) => {
  try {
    // populated 'postedBy' field based on foreign key
    // second param == fields to include
    const posts = await Post.find().populate("postedBy", "_id name profilePicURL").populate({
      path: 'comments',
      populate: {
        // populate each 'User' for comments
        path: 'postedBy',
        model: 'User'
      }
    })

    res.json({ posts })
  } catch (err) {
    console.error(err)
  }
})

// READ/GET followed user posts
router.get("/followedposts", requireLogin, async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: { $in: req.user.following } }).populate("postedBy", "_id name profilePicURL").populate({
      path: 'comments',
      populate: {
        path: 'postedBy',
        model: 'User'
      }
    })
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
    const { title, body, assetUrl, type } = req.body;

    if (!title || !body || !assetUrl || !type) {
      return res.status(422).json({ error: "Please Enter All Required Fields" })
    }

    // hide password from response w/ undefined
    req.user.password = undefined;

    // create new post ASSOCIATING with user
    // user retrieved from 'Authorization' header with JWT
    const post = new Post({
      title, body, asset: assetUrl, type, postedBy: req.user
    })

    // save post to DB & respond with post
    const savedPost = await post.save();
    res.json({ post: savedPost });

  } catch (err) {
    console.log(err)
  }
})

// ADD a like (associated user) to a post
router.put("/like", requireLogin, async (req, res) => {
  try {
    const likedPost = await Post.findByIdAndUpdate(req.body.postId, {
      // the LOGGED IN USER can be the only one to like the post
      $push: { likes: req.user._id }
    }, {
      new: true
    })
    // respond with the liked post
    res.json(likedPost)
  } catch (err) {
    console.log(err)
    return res.status(422).json({ error: err })
  }
})

// REMOVE a like (associated user) from a post
router.put("/unlike", requireLogin, async (req, res) => {
  try {
    const unlikedPost = await Post.findByIdAndUpdate(req.body.postId, {
      // the LOGGED IN USER can be the only one to unlike the post
      $pull: { likes: req.user._id }
    }, {
      new: true
    })
    // respond with the unliked post
    res.json(unlikedPost)
  } catch (err) {
    console.log(err)
    return res.status(422).json({ error: err })
  }
})

// ADD a comment (associated user) to a post
router.put("/comment", requireLogin, async (req, res) => {
  try {
    // create comment by associating text & comment user
    const comment = {
      text: req.body.text,
      postedBy: req.user._id
    }

    const commentedPost = await Post.findByIdAndUpdate(req.body.postId, {
      // the LOGGED IN USER can be the only one to comment on the post
      $push: { comments: comment }
    }, {
      new: true
    })
      // populate the comment data with user_id & name
      .populate("comments.postedBy", "_id name")

    // respond with the unliked post
    res.json(commentedPost)
  } catch (err) {
    console.log(err)
    return res.status(422).json({ error: err })
  }
})

// DELETE post
router.delete("/deletepost/:postId", requireLogin, async (req, res) => {
  try {
    // find the post to delete
    const postToDelete = await Post.findOne({ _id: req.params.postId })
      .populate("postedBy", "_id name")

    // check if the post belongs to logged in user (post id vs. context id)
    if (postToDelete.postedBy._id.toString() === req.user._id.toString()) {
      // delete post
      const deletedPost = await Post.findOneAndDelete({ _id: req.params.postId })
        .populate("postedBy", "_id name")
      res.json(deletedPost);
    }
  } catch (err) {
    console.log(err)
    return res.status(422).json({ error: err })
  }
})

// DELETE comment
router.delete("/deletecomment/:postId/:commentId", requireLogin, async (req, res) => {
  try {
    // find the post to delete a comment from
    const postToDeleteComment = await Post.findOne({ _id: req.params.postId })
      .populate("postedBy", "_id name")

    // filter comment from post that matches commentId
    const comment = postToDeleteComment.comments.filter(comment =>
      comment._id.toString() === req.params.commentId
    )

    // check if the comment's user id == the logged in user
    if (comment[0].postedBy.toString() === req.user._id.toString()) {
      // find the post to delete comment
      const deletedComment = await Post.findOneAndUpdate({ _id: req.params.postId }, {
        $pull: { comments: { _id: req.params.commentId } }
      }, {
        new: true
      })
        .populate("comments.postedBy", "_id name")

      // respond with new comment
      res.json(deletedComment)
    }
  } catch (err) {
    console.log(err)
    return res.status(422).json({ error: err })
  }
})

module.exports = router;