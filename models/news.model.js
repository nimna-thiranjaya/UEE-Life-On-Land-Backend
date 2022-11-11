const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    newsTittle: {
      type: String,
      required: true,
      trim: true,
    },

    newsContent: {
      type: String,
      required: true,
      trim: true,
    },

    newsImage: {
      type: String,
      required: true,
      trim: true,
    },

    newsAuthor: {
      type: Object,
    },
    createdUser: {
      type: String,
      required: true,
    },

    adminStatus: {
      type: String,
      default: "Pending",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
