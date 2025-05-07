const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const auth = require("./middleware/auth");
const authRouter = require("./routes/auth");
const app = express();
// app.use("/", auth);
app.use("/", authRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    errorCode: "INTERNAL_ERROR",
    message: err.message || "Something went wrong",
  });
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () =>
      console.log("Server is listining on port " + process.env.PORT)
    );
  })
  .catch((err) => {
    console.error("Database connection Failed!", err);
  });
