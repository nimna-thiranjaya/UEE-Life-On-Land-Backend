const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    preference: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      required: true,
      trim: true,
    },

    createdUser: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
