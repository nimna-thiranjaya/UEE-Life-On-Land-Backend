const bcrypt = require("bcrypt");

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
        res
          .status(201)
          .send({ status: true, message: "User Created Successfully" });
      } else {
        res
          .status(400)
          .send({ status: false, message: "User Creation Failed" });
      }
    } else {
      return res
        .status(201)
        .send({ status: false, message: "User already exists" });
    }
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = { UserRegister };
