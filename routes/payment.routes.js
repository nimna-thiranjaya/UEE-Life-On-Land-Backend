const express = require("express");
const PaymentRouter = express.Router();

const {
  CreatePayment,
  GetAllUserPayments,
} = require("../controllers/payment.controller");
const userAuth = require("../middlewares/user.middleware");

PaymentRouter.post("/createPayment", userAuth, CreatePayment);
PaymentRouter.get("/getAllUserPayments", userAuth, GetAllUserPayments);

module.exports = PaymentRouter;
