const { models } = require("mongoose");
const Listing = require("../models/listing");
const Reservation = require("../models/reservation");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index', { allListings }); 
};

module.exports.renderNewFrom = (req,res) =>{

    res.render("listings/new"); 
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews", 
        populate: {
            path:"author",
        }})
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not exist! ")
        return res.redirect("/listings")

    }
    res.render('listings/show.ejs', { listing });
}

module.exports.createListing =  async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created")
    res.redirect('/listings');
}

module.exports.editListing = async (req, res) => { 
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist! ")
        return res.redirect("/listings")

    }
    res.render('listings/edit.ejs', { listing });
}

module.exports.updateListing = async (req, res) => {
    let  { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });
    if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    req.flash("success", "Listing updated !")
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted !")
    res.redirect('/listings');
}

module.exports.showReservations = async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id }).populate("listing");
  res.render("reservations/index", { reservations });
}

module.exports.addReservations = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.body;
    const listing = await Listing.findById(id);

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24));
    const totalPrice = nights * listing.price;

    await Reservation.create({
      listing: id,
      user: req.user._id,
      checkIn,
      checkOut,
      guests,
      totalPrice
    });

    req.flash("success", "Reservation confirmed!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong with reservation");
    res.redirect("back");
  }
}