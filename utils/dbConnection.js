const mongoose = require("mongoose");

const connection = () => {
  const dbConStr = process.env.MONGODB_URI;
  mongoose.connect(dbConStr, () => {
    console.log("Database connected");
  });
};

module.exports = { connection };
