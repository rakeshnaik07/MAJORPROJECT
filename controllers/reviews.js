const Listing = require("../models/listing")
const Reviews = require('../models/reviews/reviews.js');

module.exports.createReview = async(req, res) => {
    let listing = await Listing.findById(req.params.id)
    let newReview = new Reviews(req.body.review)
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review added !")

    res.redirect(`/listings/${listing._id}`)
}

module.exports.deleteRoute = async (req, res) => {
        let { id, reviewID } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
        await Reviews.findByIdAndDelete(reviewID);
        req.flash("success", "Review Deleted !")
        res.redirect(`/listings/${id}`);
    }