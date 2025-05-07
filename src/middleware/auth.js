const auth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
  } else
    res.status(401).json({
      error: "unauthorized",
      message: "Unauthorized access. Please log in to continue.",
    });
};

module.exports = auth;
