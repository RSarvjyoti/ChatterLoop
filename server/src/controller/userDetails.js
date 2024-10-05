const { getUserDetailFromToken } = require("../utils/getUserDetailsFromToken");

const userDetails = async (req, res) => {
  try {
    // Fetch the token from cookies
    const token = req.cookies.token || "";
    
    console.log("Token:", token); // Debug: Check if token is present
    
    if (!token) {
      return res.status(401).json({
        message: "No token provided. Please log in.",
        error: true,
      });
    }

    // Get user details from the token
    const user = await getUserDetailFromToken(token);

    // If session is out, handle accordingly
    if (user.logout) {
      return res.status(401).json({
        message: "Session expired. Please log in again.",
        logout: true,
      });
    }

    // If valid, return user details
    return res.status(200).json({
      message: "User details retrieved successfully",
      data: user,
    });

  } catch (error) {
    // Generic error handling
    console.error("Error in fetching user details:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = userDetails;