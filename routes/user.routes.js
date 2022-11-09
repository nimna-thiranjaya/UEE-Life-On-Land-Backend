const express = require("express");
const UserRouter = express.Router();

const {
  UserRegister,
  UploadProfileImage,
  UserLogin,
  UserProfile,
  UserProfileUpdate,
  DeleteUserProfile,
} = require("../controllers/user.controller");
const userAuth = require("../middlewares/user.middleware");

UserRouter.post("/register", UserRegister);
UserRouter.patch("/uploadProfileImage", userAuth, UploadProfileImage);
UserRouter.post("/login", UserLogin);
UserRouter.get("/profile", userAuth, UserProfile);
UserRouter.patch("/profileUpdate", userAuth, UserProfileUpdate);
UserRouter.delete("/deleteProfile", userAuth, DeleteUserProfile);

module.exports = UserRouter;
