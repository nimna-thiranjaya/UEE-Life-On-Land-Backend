const Payment = require("../models/payment.model");

//Get time Difference for news published
const timeDifference = (current, previous) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " sec ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " min ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return +Math.round(elapsed / msPerYear) + " years ago";
  }
};
//Create Payment
const CreatePayment = async (req, res) => {
  try {
    const { preference, note } = req.body;
    const createdUser = req.logedUser._id;
    const newPayment = new Payment({
      preference,
      note,
      createdUser,
    });
    await newPayment.save();
    res.status(201).send({
      status: true,
      message: "Payment created successfully",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//Get All User Payments
const GetAllUserPayments = async (req, res) => {
  try {
    const userId = req.logedUser._id;
    const payments = await Payment.find({ createdUser: userId }).sort({
      createdAt: -1,
    });

    const paymentsWithTimeDifference = payments.map((payment) => {
      const time = timeDifference(new Date(), payment.createdAt);
      return { ...payment._doc, time };
    });
    res.status(200).send({
      status: true,
      message: "All user payments",
      payments: paymentsWithTimeDifference,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  CreatePayment,
  GetAllUserPayments,
};
