const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const main = require("./sendMail");

const app = express();
dotenv.config();
const PORT = process.env.PROJECT_PORT || 8000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
