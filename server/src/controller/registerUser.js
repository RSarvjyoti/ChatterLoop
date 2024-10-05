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
  try{
    const {password, userId} = req.body;

    const user = await UserModel.findById(userId);

    // compare the hash password
    const verifyPassword = await bcryptjs.compare(password, user.password);

    if(!verifyPassword) {
      return res.status(400).json({
        message : "Please check password.",
        error : true,
      })
    }

    // genrate jwt token
    const tokenData = {
      id : user._id,
      email : user.email
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn : "1d"});

    // Set token into cookies

    const cookieOptions = {
      http : true,
      secure : true
    }

    return res.cookie('token', token, cookieOptions ).status(200).json({
      message : "Login successfully.",
      token : token,
      success : true,
    })

  } catch(error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    })
  }
}

module.exports = { register, emailVerify, checkPassword };
