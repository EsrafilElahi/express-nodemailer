const express = require("express");
const {
  registerController,
  loginController,
  verifyTokenID,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/verify/:accessToken", verifyTokenID);

module.exports = router;
