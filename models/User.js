const mongoose = require('mongoose')

// Define User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nidPassport: {
    type: String,
    required: true
  },
  terms: {
    type: Boolean,
    required: true
  },
  privacy: {
    type: Boolean,
    required: true
  },
  dataProcessing: {
    type: Boolean,
    required: true
  }
})

// Create User model
const User = mongoose.model('User', userSchema)

module.exports = User
