const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")





//Reviews
//Post Route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview))

//Delete review route

router.delete(
    "/:reviewID",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteRoute)
);


module.exports = router;