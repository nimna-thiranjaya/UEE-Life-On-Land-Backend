const mongoose = require("mongoose");

const userScheama = mongoose.Schema({});

const User = mongoose.model("User", userScheama);
module.exports = User;
