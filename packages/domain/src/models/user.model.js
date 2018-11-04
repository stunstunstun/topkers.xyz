const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  facebook: {
    type: Object,
  },
  email: {
    type: Object,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre('findOneAndUpdate', function hook() {
  this.findOneAndUpdate({}, { $set: { updated: new Date() } })
})

module.exports = mongoose.model('User', userSchema)
