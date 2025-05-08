const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const { _id } = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(_id);
      if (user) {
        req.user = user;
        next();
      } else
        return res.status(401).json({
          error: "unauthorized",
          message: "Unauthorized access. Please log in to continue.",
        });
    } else
      return res.status(401).json({
        error: "unauthorized",
        message: "Unauthorized access. Please log in to continue.",
      });
  } catch (error) {
    return res.status(401).json({
      error: "unauthorized",
      message: "Authentication failed. Please log in again.",
    });
  }
};

module.exports = auth;
