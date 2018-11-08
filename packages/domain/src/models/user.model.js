const mongoose = require('mongoose')
const { SERVICE_TYPE } = require('../constants')

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  serviceType: {
    type: Number,
    required: true,
    enum: Object.values(SERVICE_TYPE),
  },
  token: {
    type: String,
    required: true,
  },
  userInfo: {},
  created: {
    type: Date,
    required: true,
  },
  updated: {
    type: Date,
    required: true,
  },
})

userSchema.index({ id: 1, serviceType: 1 }, { unique: true })

userSchema.pre('findOneAndUpdate', function hook() {
  this.findOneAndUpdate({}, { updated: new Date() })
})

module.exports = mongoose.model('User', userSchema)
