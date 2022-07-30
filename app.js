const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const nodemailer = require("nodemailer");
const connectDB = require("./database/db");
const userRoutes = require("./routes/user");

const app = express();
dotenv.config();
const PORT = process.env.PROJECT_PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());
app.use("/auth", userRoutes);

// routes
app.get("/", (req, res) => {
  res.send("welcon to home page");
});
app.get("*", (req, res) => {
  res.send("404 not found page");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`app running on port ${PORT}`);
});
