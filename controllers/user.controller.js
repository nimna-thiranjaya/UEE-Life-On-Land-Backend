const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

//User Registration
const UserRegister = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    //Check if user already exists
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = {
        fullName,
        email,
        password: hashPassword,
        role,
      };

      const result = await User.create(newUser);

      if (result) {
        return res
          .status(201)
          .send({ status: true, message: "User Created Successfully" });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "User Creation Failed" });
      }
    } else {
      return res
        .status(201)
        .send({ status: false, message: "User already exists" });
    }
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

//Upload profile image
const UploadProfileImage = async (req, res) => {
  try {
    const { profileImage } = req.body;

    const user = req.logedUser;

    const result = await User.findByIdAndUpdate(user._id, {
      profileImage: profileImage,
    });

    if (result) {
      return res
        .status(201)
        .send({ status: true, message: "Profile Image Uploaded" });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Profile Image Upload Failed" });
    }
  } catch (e) {
    return res.status(500).send({ status: false, message: e.message });
  }
};

//User login
const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isEmailCheck = await User.findOne({ email: email });

    if (isEmailCheck) {
      const isPasswordCheck = await bcrypt.compare(
        password,
        isEmailCheck.password
      );

      if (isPasswordCheck) {
        const token = jwt.sign(
          { _id: isEmailCheck._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );

        const tokenarraysize = isEmailCheck.tokens.length;

        if (tokenarraysize >= 5) {
          const temp = [];
          await User.findByIdAndUpdate(isEmailCheck._id, { tokens: temp });
        }

        const tokens = {
          token: token,
        };

        await User.findByIdAndUpdate(isEmailCheck._id, {
          $push: { tokens: tokens },
        });

        return res.status(200).send({
          status: true,
          message: "Login Successfull",
          token: token,
          role: isEmailCheck.role,
        });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Invalid Password" });
      }
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Account not found" });
    }
  } catch (e) {
    return res.status(500).send({ status: false, message: e.message });
  }
};

//User Profile
const UserProfile = async (req, res) => {
  try {
    const LogedUser = req.logedUser;
    if (LogedUser) {
      return res.status(200).send({ status: true, user: LogedUser });
    } else {
      return res.status(400).send({ status: false, message: "User not found" });
    }
  } catch (e) {
    return res.status(500).send({ status: false, message: e.message });
  }
};

//User profile update
const UserProfileUpdate = async (req, res) => {
  try {
    const { fullName, description, phoneNumber, Occupation } = req.body;

    const LogedUser = req.logedUser;

    if (LogedUser) {
      const newData = {
        fullName,
        description,
        phoneNumber,
        Occupation,
      };
      const result = await User.findByIdAndUpdate(LogedUser._id, newData);

      if (result) {
        return res
          .status(201)
          .send({ status: true, message: "Profile Updated" });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Profile Update Failed" });
      }
      s;
    } else {
      return res.status(400).send({ status: false, message: "User not found" });
    }
  } catch (e) {
    return res.status(500).send({ status: false, message: e.message });
  }
};

//Delete User Profile
const DeleteUserProfile = async (req, res) => {
  try {
    const LogedUser = req.logedUser;

    if (LogedUser) {
      const result = await User.findByIdAndDelete(LogedUser._id);

      if (result) {
        return res
          .status(201)
          .send({ status: true, message: "Profile Deleted" });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Profile Delete Failed" });
      }
    } else {
      return res.status(400).send({ status: false, message: "User not found" });
    }
  } catch (e) {
    return res.status(500).send({ status: false, message: e.message });
  }
};

module.exports = {
  UserRegister,
  UploadProfileImage,
  UserLogin,
  UserProfile,
  UserProfileUpdate,
  DeleteUserProfile,
};
