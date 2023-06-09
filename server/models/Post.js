const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  // will store URL of asset
  asset: {
    type: String,
    required: true
  },
  // type of asset
  type: {
    type: String,
    required: true
  },
  likes: [
    {
      // type: ARRAY of USERS
      type: ObjectId, ref: "User"
    }
  ],
  comments: [{
    text: String,
    // reference/foreign key
    postedBy: {
      type: ObjectId,
      ref: "User"
    }
  }],
  // reference/foreign key
  postedBy: {
    type: ObjectId,
    ref: "User"
  }
})

mongoose.model("Post", postSchema)