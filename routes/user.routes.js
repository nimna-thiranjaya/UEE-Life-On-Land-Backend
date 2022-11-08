const express = require("express");
const UserRouter = express.Router();

const { UserRegister } = require("../controllers/user.controller");
const userAuth = require("../middlewares/user.middleware");

UserRouter.post("/register", UserRegister);

module.exports = UserRouter;
