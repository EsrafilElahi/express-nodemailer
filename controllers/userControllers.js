const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const uuid = require("uuid");

const registerController = async (req, res) => {
  // check user exist
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    res.status(400).send("Email Already Exist!");
  }

  try {
    let accessToken = uuid.v4();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const savedUser = new User({
      name: req.body.name,
      email: req.body.email,
      active: req.body.active,
      password: hashedPassword,
      accessToken: accessToken,
    });

    await savedUser.save();

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let info = await transporter.sendMail({
      from: "<essinho1121@gmail.com>",
      to: savedUser.email,
      subject: "this is real sub",
      text: "this is real text",
      html: `<a href="http://localhost:${
        process.env.PROJECT_PORT || 8000
      }/auth/verify/${
        savedUser.accessToken
      }">click to link for activate account </a>`,
    });
    console.log(nodemailer.getTestMessageUrl(info));
    const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY);
    res.header("Auth-Token", token);
    res.status(201).json({ token: token, user: savedUser });
  } catch (error) {
    res.status(400).send("create user error " + error);
  }
};

const verifyTokenID = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { accessToken: req.params.accessToken },
    { active: true, $unset: { accessToken: "" } }
  );

  if (!user) {
    res.status(401).send("user not found with this accessToken");
  }
  res.status(200).send("verified accessToken successfully");
};

const loginController = async (req, res) => {
  // check user exist
  const user = await User.findOne({ email: req.body.email, active: true });
  if (!user) {
    res.status(404).send("user with active true not found!");
  }
  // check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400).send("email or password is wrong!");
  }

  try {
    // create and sign token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.header("Auth-Token", token);
    res.status(200).json({ token: token, msg: "you logged in" });
  } catch (error) {
    res.status(400).send("err in login " + error);
  }
};

module.exports = {
  registerController,
  loginController,
  verifyTokenID,
};
