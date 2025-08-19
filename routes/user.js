const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user")

//GET and POST route for signup
router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post( 
    wrapAsync( userController.signup ));

// GET and POST route for login
router
    .route("/login")
    .get( userController.renderLoginForm)
    .post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: '/login',
        failureFlash: true,
    }),
    userController.login
);


router.get("/logout", userController.logout)


module.exports = router;