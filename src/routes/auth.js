const express = require("express");
const authRouter = express.Router();
const { registerUser, loginUser } = require("../controller/authController");
authRouter.use(express.json());

authRouter.post("/signup", registerUser);

authRouter.post("/login", loginUser);

module.exports = authRouter;
