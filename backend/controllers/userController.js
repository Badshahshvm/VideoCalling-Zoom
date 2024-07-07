const User = require("../models/userSchema");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.FOUND).json({
        message: "User already exists",
        existingUser,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(httpStatus.CREATED).json({
      message: "User registered successfully",
      newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please Provide" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.FOUND).json({
        message: "User does not found",
      });
    }
    if (bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpStatus.Ok).json({
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred",
    });
  }
};

module.exports = { register, login };
