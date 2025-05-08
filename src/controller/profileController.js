const { validateEditProfileData } = require("../utils/validation");

const viewProfile = async (req, res) => {
  try {
    const { fullName, email, gender } = req.user;

    res.status(200).json({
      success: true,
      data: { fullName, email, gender },
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const user = req.user;
    if (validateEditProfileData(req)) {
      Object.keys(req.body).forEach((keys) => (user[keys] = req.body[keys]));
    } else {
      res.status(401).json({ success: true, message: error.message });
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      // data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = { viewProfile, editProfile };
