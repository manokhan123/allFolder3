
const express = require("express");
const { Signuprender, loginRender, homerender, otpRender, signuppost, otpPost, loginPost } = require("../controller/controller");
const router = express.Router()






// ==================================================
// 6. GET ROUTES / PAGES
// ==================================================

// Signup page

router.get("/signup", Signuprender );

// Login page
router.get("/login", loginRender);

// Home page
router.get("/home", homerender);

// OTP page
router.get("/otppage", otpRender);

// ==================================================
// 7. SIGNUP
// ==================================================

router.post("/signup", signuppost);

// ==================================================
// 8. OTP VERIFICATION
// ==================================================

router.post("/verify-otp", otpPost);

// ==================================================
// 9. LOGIN
// ==================================================

router.post("/login", loginPost);


module.exports = router