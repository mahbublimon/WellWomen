const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  profile: {
    fullName: { type: String },
    dob: { type: Date },
    contactNumber: { type: String },
    address: { type: String }
  }
});

module.exports = mongoose.model("User", userSchema);