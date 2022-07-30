"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    // service: "gmail",
    auth: {
      user: "charley.rowe@ethereal.email", // generated ethereal user
      pass: "ryGGAA4S8hGFJYxKYs", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "test@gmail.com",
    to: "essinho1121@gmail.com",
    subject: "this is a test rmail",
    text: "Hello world nodemail",
    html: "<b>nodemailer test</b>",
  });

  console.log("Message sent: %s", info);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail().catch((err) => console.log("err :", err));
