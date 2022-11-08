const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  Occupation: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: "User",
    required: true,
    trim: true,
  },
  profileImage: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
