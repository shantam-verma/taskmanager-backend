const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/authController");
authRouter.use(express.json());

authRouter.post("/signup", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logoutUser);

module.exports = authRouter;
