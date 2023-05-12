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
  // will store URL of image
  photo: {
    type: String,
    required: true
  },
  // reference/foreign key
  postedBy: {
    type: ObjectId,
    ref: "User"
  }
})

mongoose.model("Post", postSchema)