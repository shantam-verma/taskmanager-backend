const validator = require("validator");

const validateSignUpForm = (req) => {
  const { password, email } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password!");
  }
};

const validateEditProfileData = (req) => {
  const ALLOWED_KEYS = ["fullName", "gender"];
  const isEditAllowed = Object.keys(req.body).every((keys) =>
    ALLOWED_KEYS.includes(keys)
  );
  if (isEditAllowed) {
    return true;
  } else throw new Error("Invalid Allowed path");
};

module.exports = { validateSignUpForm, validateEditProfileData };
