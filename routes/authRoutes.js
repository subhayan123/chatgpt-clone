const express = require("express");
const { RegisterController, LoginController, LogoutController } = require("../controllers/authController");

//router object
const router = express.Router()

//routes
//register
router.post("/register", RegisterController);
//login
router.post("/login", LoginController);
//logout
router.post("/logout", LogoutController);


module.exports = router;