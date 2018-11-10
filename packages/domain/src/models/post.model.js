const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  source: {
    type: Number,
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

postSchema.index({ id: 1, source: 1 }, { unique: true })

postSchema.pre('updateMany', function hook() {
  this.updateMany({}, { $set: { updated: new Date() } })
})

module.exports = mongoose.model('Post', postSchema)
