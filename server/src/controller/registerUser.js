const UserModel = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: "User already exits",
        error: true,
      });
    }

    // password into hashed password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
      profile_pic,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return res.status(201).json({
      message: "User create successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const emailVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await UserModel.findOne({ email }).select(`-password`);
    if(!checkEmail) {
      return res.status(400).json({
        message : "User not exits.",
        error : true
      })
    }

    return res.status(200).json({
      message : "Email Verify",
      success : true,
      data : checkEmail
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};


//  Check password
const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;

    // Find user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        error: true,
      });
    }

    // Compare the provided password with the hashed password
    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Incorrect password.",
        error: true,
      });
    }

    // Generate JWT token
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    // Set token into cookies with additional options
    const cookieOptions = {
      httpOnly: true, // ensures cookie is only accessible via HTTP(S)
      secure: process.env.NODE_ENV === "production", // ensures cookie is sent only over HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    };

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successfully.",
        token: token,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};


module.exports = { register, emailVerify, checkPassword };
