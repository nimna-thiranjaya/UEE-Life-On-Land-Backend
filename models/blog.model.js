const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogTittle: {
      type: String,
      required: true,
      trim: true,
    },

    blogContent: {
      type: String,
      required: true,
      trim: true,
    },

    blogImage: {
      type: String,
      required: true,
      trim: true,
    },

    blogAuthor: {
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

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
