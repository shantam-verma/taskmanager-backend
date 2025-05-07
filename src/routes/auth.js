const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpForm } = require("../utils/validation");
authRouter.use(express.json());

authRouter.post("/signup", async (req, res) => {
  try {
    const { fullName, password, gender, email } = req.body;
    validateSignUpForm(req);
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, gender, email, password: hashPassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User signed up successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const checkPassword = await user.validatePassword(password);
      if (checkPassword) {
        const token = await user.getJWT();
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24,
          })
          .status(201)
          .json({ success: true, message: "User login successful" });
      } else
        res.status(400).json({
          success: false,
          message: "Invalid credincials",
        });
    } else
      res.status(400).json({
        success: false,
        message: "Invalid credincials",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = authRouter;
