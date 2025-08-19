const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const accountControllers = require("../controllers/account")



// Show reservations on profile page
router.get("/", isLoggedIn, accountControllers.account );

module.exports = router;