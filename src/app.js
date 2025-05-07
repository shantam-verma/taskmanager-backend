const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const authRouter = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

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
    app.listen(port, () => console.log("Server is listining on port " + port));
  })
  .catch((err) => {
    console.error("Database connection Failed!", err);
  });
