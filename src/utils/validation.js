const validator = require("validator");

const validateSignUpForm = (req) => {
  const { password, email } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password!");
  }
};

module.exports = { validateSignUpForm };
