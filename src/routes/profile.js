const express = require("express");
const auth = require("../middleware/auth");
const { viewProfile, editProfile } = require("../controller/profileController");
const profileRoute = express.Router();
profileRoute.use(express.json());

profileRoute.get("/view", auth, viewProfile);

profileRoute.patch("/edit", auth, editProfile);

module.exports = profileRoute;
