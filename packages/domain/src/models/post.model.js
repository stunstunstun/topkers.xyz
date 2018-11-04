const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  source: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  desc: String,
  author: String,
  avatar: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Post', postSchema)
