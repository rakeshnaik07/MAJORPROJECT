const mongoose = require("mongoose");
const Listing = require("./listing");  // 🔥 Import Listing model
const User = require("./user");        // 🔥 Import User model (optional cleanup)

const reservationSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    default: 1
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// 🔥 Middleware: Cleanup when a reservation is deleted
reservationSchema.post("findOneAndDelete", async (reservation) => {
  if (reservation) {
    try {
      // Optionally, you can also remove reservation refs from Listing/User 
      // if you decide to store them in those schemas.
      console.log(`🧹 Cleaned reservation ${reservation._id} for listing ${reservation.listing}`);
    } catch (err) {
      console.error("Reservation cleanup error:", err);
    }
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);
