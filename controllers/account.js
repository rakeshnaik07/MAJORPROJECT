const Reservation = require("../models/reservation");
module.exports.account = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate("listing") // so we can show listing details
      .sort({ createdAt: -1 });

    res.render("account/profile", { user: req.user, reservations });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while loading reservations.");
    res.redirect("/");
  }
}