const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require('../models/listing');
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const Reservation = require("../models/reservation");

const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})


router
    .route("/")
    .get( wrapAsync(listingController.index)) //index route
    .post(  
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)); // create route
    

//New route
router.get("/new",isLoggedIn, listingController.renderNewFrom);

router
    .route('/:id')
    .get( listingController.showListing ) //show route
    .put( 
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync( listingController.updateListing)) // update listing route
    .delete(
    isLoggedIn,
    isOwner,
    wrapAsync( listingController.deleteListing)) // delete listing route




//Edit route
router.get(
    '/:id/edit',
    isLoggedIn,
    isOwner,
    wrapAsync( listingController.editListing));


router.get(
    "/my-reservations", 
    isLoggedIn, 
    listingController.showReservations);

router.post(
    "/:id/reserve", 
    isLoggedIn, 
    listingController.addReservations);


module.exports = router;