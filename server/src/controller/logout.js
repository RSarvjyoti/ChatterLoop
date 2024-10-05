require("dotenv").config();

const logout = async (req, res) => {
    try {
      // Clear the token by setting its maxAge to 0
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure flag in production
        expires: new Date(0), // This will expire the cookie immediately
      });
  
      return res.status(200).json({
        message: "Logged out successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
      });
    }
  };
  
  module.exports = logout;
  