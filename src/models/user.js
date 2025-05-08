const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const GENDER_ENUM = ["Male", "Female", "Others"];

const userSchema = new Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    gender: {
      type: String,
      enum: {
        values: GENDER_ENUM,
        message: "Invalid gender `{VALUE}`. Allowed: Male, Female, Others",
      },
      required: [true, "Gender is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User already exists"],
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordByUser) {
  const user = this;
  console.log("Input password:", !!passwordByUser);
  console.log("Stored password:", !!user.password);
  const isPasswordValid = await bcrypt.compare(passwordByUser, user.password);
  return isPasswordValid;
};

module.exports = model("User", userSchema);
