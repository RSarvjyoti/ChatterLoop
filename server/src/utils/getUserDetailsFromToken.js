const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
require("dotenv").config();

const getUserDetailFromToken = async (token) => {
  try {
    if (!token) {
      return {
        message: "Session expired",
        logout: true,
      };
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return {
        message: "User not found",
        logout: true,
      };
    }

    return user;
  } catch (error) {
    console.error("Error in token verification:", error);
    return {
      message: "Invalid or expired token",
      logout: true,
    };
  }
};

module.exports = { getUserDetailFromToken };