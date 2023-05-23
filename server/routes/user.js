const express = require('express');
const router = express.Router()
// mongoose & DB models
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

// middlewares
// will check if the JWT is valid/exists as a header
const requireLogin = require("../middleware/requireLogin")

// protected routes (w/ middlewares)
// will only run if it JWT is valid and User data is retrieved

// retrieve USER & POSTS data from logged in user
router.get("/user/:id", requireLogin, async (req, res) => {
  try {
    // find user info associated with 'id'
    const oneUser = await User.findOne({ _id: req.params.id }).select("-password")

    // find all posts associated with user
    const userPosts = await Post.find({ postedBy: req.params.id }).populate("postedBy", "_id name")
    res.json({ oneUser, userPosts })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: "User Or Posts Not Found" })
  }
})

// ADD followers to user
router.put("/follow", requireLogin, async (req, res) => {
  try {
    // add logged in user to 'followers'
    await User.findByIdAndUpdate(req.body.followId, {
      $push: { followers: req.user._id }
    }, { new: true }).select("-password")

    // add followed user to 'following'
    const addFollowingToCurrentUser = await User.findByIdAndUpdate(req.user._id, {
      $push: { following: req.body.followId }
    }, { new: true })

    // return 'following' data
    res.json({ addFollowingToCurrentUser })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ error: "Failed To Follow/Add Follower To User" })
  }
})

// REMOVE followers from user
router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    // remove logged in user from 'followers'
    await User.findByIdAndUpdate(req.body.unfollowId, {
      $pull: { followers: req.user._id }
    }, { new: true }).select("-password")

    // remove followed user from 'following'
    const removeFollowingFromCurrentUser = await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: req.body.unfollowId }
    }, { new: true })

    // return 'unfollowing' data
    res.json({ removeFollowingFromCurrentUser })

  } catch (err) {
    console.log(err)
    return res.status(422).json({ error: "Failed To Follow/Add Follower To User" })
  }
})

router.put("/updatepic", requireLogin, async (req, res) => {
  try {
    // find logged in user and update profile pic url with new one
    const updatePic = await User.findByIdAndUpdate(req.user._id, {
      $set: { profilePicURL: req.body.profilePicURL },
    }, { new: true })

    // send the response back
    res.json(updatePic);
  } catch (err) {
    console.log(err)
    return res.status(422).json({ err: "Profile Pic Cannot Post" })
  }
})

router.post("/search-users", (req, res) => {
  // find all records that start with the "search term"
  let userPattern = new RegExp("^" + req.body.query)
  User.find({ email: { $regex: userPattern } })
    // only retrieve _id & email
    .select("_id email")
    .then(user => res.json({ user }))
    .catch(err => console.log(err))

})

module.exports = router;
