const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // reset password token & it's expiration date
  resetToken: {
    type: String
  },
  expireToken: {
    type: Date
  },
  profilePicURL: {
    type: String,
    default: "https://res.cloudinary.com/fajarda1storage/image/upload/v1684359424/no-user-image_k1gv0g.gif"
  },
  followers: [{
    // type: ARRAY of USERS
    type: ObjectId, ref: "User"
  }],
  following: [{
    // type: ARRAY of USERS
    type: ObjectId, ref: "User"
  }],
})

mongoose.model("User", userSchema)