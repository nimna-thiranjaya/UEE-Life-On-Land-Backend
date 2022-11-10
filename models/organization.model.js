const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      trim: true,
    },
    orgEmail: {
      type: String,
      required: true,
      trim: true,
    },
    orgContactNo: {
      type: String,
      required: true,
      trim: true,
    },
    orgCountry: {
      type: String,
      required: true,
      trim: true,
    },
    orgDescription: {
      type: String,
      trim: true,
    },
    orgLogo: {
      type: String,
      trim: true,
      default:
        "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6",
    },
    createdUser: {
      type: String,
      required: true,
      trim: true,
    },
    adminStatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", OrganizationSchema);
module.exports = Organization;
