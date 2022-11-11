const mongoose = require("mongoose");

const forestSchema = new mongoose.Schema(
  {
    forestName: {
      type: String,
      required: true,
      trim: true,
    },
    forestDetails: {
      type: String,
      required: true,
      trim: true,
    },

    forestImage: {
      type: String,
      trim: true,
    },

    createdUser: {
      type: String,
      trim: true,
    },

    adminStatus: {
      type: String,
      required: true,
      default: "Approved",
    },
  },
  {
    timestamps: true,
  }
);

const Forest = mongoose.model("Forest", forestSchema);
module.exports = Forest;
